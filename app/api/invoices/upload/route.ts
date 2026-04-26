export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { assertTenant } from '@/lib/tenant'
import { db } from '@/lib/db'
import { put } from '@vercel/blob'
import { extractInvoiceFromText } from '@/agents/invoice/extractor'
import { syncInvoiceToIntegration } from '@/integrations/sync'
import { randomUUID } from 'crypto'

const ALLOWED_TYPES = ['text/xml', 'application/xml', 'application/pdf']
const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5MB

export async function POST(req: NextRequest) {
  const session = await getSession()
  const tenantId = assertTenant(session?.user?.tenantId)

  // Verifica limite do plano
  const tenant = await db.tenant.findUnique({ where: { id: tenantId } })
  if (tenant?.plano === 'ESSENCIAL') {
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)
    const count = await db.invoice.count({
      where: { tenantId, criadoEm: { gte: startOfMonth } },
    })
    if (count >= 500) {
      return NextResponse.json(
        { error: 'Limite de 500 NFs/mês atingido. Faça upgrade para o plano Completo.' },
        { status: 403 }
      )
    }
  }

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'Arquivo obrigatório' }, { status: 400 })
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Formato de arquivo não suportado. Use XML ou PDF.' }, { status: 400 })
  }
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: 'Arquivo maior que 5MB' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  let contentText = ''

  if (file.type === 'application/pdf') {
    try {
      const pdf = require('pdf-parse')
      const data = await pdf(buffer)
      contentText = data.text
    } catch (err) {
      console.error('PDF Parse Error:', err)
      return NextResponse.json({ error: 'Falha ao ler o PDF' }, { status: 400 })
    }
  } else {
    contentText = buffer.toString('utf-8')
  }

  // Upload para Vercel Blob
  const filename = `assistly/${tenantId}/invoices/${randomUUID()}-${file.name}`
  const blob = await put(filename, buffer, {
    access: 'private',
    contentType: file.type,
  })

  // Cria invoice como PROCESSANDO
  const invoice = await db.invoice.create({
    data: {
      tenantId,
      numeroNf: 'PROCESSANDO',
      cnpjEmitente: 'PROCESSANDO',
      cnpjDestinatario: 'PROCESSANDO',
      dataEmissao: new Date(),
      valorTotal: 0,
      tipo: 'SAIDA_SERVICO',
      impostosJson: {},
      status: 'PROCESSANDO',
      s3Url: blob.url,
    },
  })

  // Extrai via Claude (síncrono)
  try {
    const extracted = await extractInvoiceFromText(contentText)

    await db.invoice.update({
      where: { id: invoice.id },
      data: {
        numeroNf: extracted.numeroNf,
        cnpjEmitente: extracted.cnpjEmitente,
        cnpjDestinatario: extracted.cnpjDestinatario,
        dataEmissao: new Date(extracted.dataEmissao),
        valorTotal: extracted.valorTotal,
        tipo: extracted.tipo,
        impostosJson: extracted.impostos,
        status: 'PROCESSADO',
      },
    })

    await syncInvoiceToIntegration(tenantId, invoice.id)

    return NextResponse.json({ invoiceId: invoice.id, status: 'PROCESSADO' }, { status: 201 })
  } catch {
    await db.invoice.update({
      where: { id: invoice.id },
      data: { status: 'ERRO' },
    })
    return NextResponse.json({ error: 'Falha ao processar NF' }, { status: 500 })
  }
}
