import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { assertTenant } from '@/lib/tenant'
import { db } from '@/lib/db'
import { buildReportSummary, detectAlertas, generateAnaliseTexto } from '@/agents/report/analyzer'
import { generateReportPdf } from '@/agents/report/pdf-generator'
import { sendReportEmail } from '@/agents/report/mailer'
import { uploadBlob, getBlobPath } from '@/lib/blob'
import { randomUUID } from 'crypto'

export async function POST() {
  const session = await getSession()
  const tenantId = assertTenant(session?.user?.tenantId)

  const tenant = await db.tenant.findUnique({
    where: { id: tenantId },
    include: { users: { where: { role: 'OWNER' } } }
  })

  if (!tenant) return NextResponse.json({ error: 'Tenant não encontrado' }, { status: 404 })

  // Define período: últimos 7 dias até hoje
  const semanaFim = new Date()
  const semanaInicio = new Date()
  semanaInicio.setDate(semanaFim.getDate() - 7)

  try {
    const invoices = await db.invoice.findMany({
      where: {
        tenantId,
        status: 'PROCESSADO',
        dataEmissao: { gte: semanaInicio, lte: semanaFim },
      },
    })

    if (invoices.length === 0) {
      return NextResponse.json({ error: 'Nenhuma nota fiscal encontrada para o período.' }, { status: 400 })
    }

    const summary = buildReportSummary(invoices)
    const alertas = detectAlertas(invoices)
    const analiseTexto = await generateAnaliseTexto(summary, alertas)

    const pdfBuffer = await generateReportPdf({
      tenantNome: tenant.nome,
      semanaInicio,
      semanaFim,
      ...summary,
      alertas,
      analiseTexto,
    })

    const blobPath = getBlobPath(tenantId, 'reports', `${randomUUID()}.pdf`)
    const pdfUrl = await uploadBlob(blobPath, pdfBuffer, 'application/pdf')

    const report = await db.report.create({
      data: {
        tenantId,
        semanaInicio,
        semanaFim,
        pdfS3Url: pdfUrl,
      },
    })

    // Enviar e-mail para os owners
    await Promise.all(
      tenant.users.map(user =>
        sendReportEmail({
          to: user.email,
          nome: user.name ?? user.email,
          tenantNome: tenant.nome,
          semanaInicio,
          semanaFim,
          pdfBuffer,
          summary,
        })
      )
    )

    await db.report.update({
      where: { id: report.id },
      data: { enviadoEm: new Date() },
    })

    return NextResponse.json({ ok: true, reportId: report.id }, { status: 201 })
  } catch (err) {
    console.error('Manual report trigger error:', err)
    return NextResponse.json({ error: 'Falha ao gerar relatório' }, { status: 500 })
  }
}
