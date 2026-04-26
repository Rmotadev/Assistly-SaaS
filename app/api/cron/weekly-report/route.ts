import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { buildReportSummary, detectAlertas, generateAnaliseTexto } from '@/agents/report/analyzer'
import { generateReportPdf } from '@/agents/report/pdf-generator'
import { sendReportEmail } from '@/agents/report/mailer'
import { uploadBlob, getBlobPath } from '@/lib/blob'
import { randomUUID } from 'crypto'

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const tenants = await db.tenant.findMany({
    where: {
      onboardingCompleto: true,
      stripeStatus: { in: ['active', 'trialing'] },
    },
  })

  const now = new Date()
  const semanaFim = new Date(now)
  semanaFim.setHours(17, 0, 0, 0)
  const semanaInicio = new Date(semanaFim)
  semanaInicio.setDate(semanaFim.getDate() - 4)

  const results = await Promise.allSettled(
    tenants.map(async (tenant) => {
      const invoices = await db.invoice.findMany({
        where: {
          tenantId: tenant.id,
          status: 'PROCESSADO',
          dataEmissao: { gte: semanaInicio, lte: semanaFim },
        },
      })

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

      const blobPath = getBlobPath(tenant.id, 'reports', `${randomUUID()}.pdf`)
      const pdfUrl = await uploadBlob(blobPath, pdfBuffer, 'application/pdf')

      const report = await db.report.create({
        data: {
          tenantId: tenant.id,
          semanaInicio,
          semanaFim,
          pdfS3Url: pdfUrl,
        },
      })

      const owners = await db.user.findMany({
        where: { tenantId: tenant.id, role: 'OWNER' },
        select: { email: true, name: true },
      })

      await Promise.all(
        owners.map(owner =>
          sendReportEmail({
            to: owner.email,
            nome: owner.name ?? owner.email,
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
    })
  )

  const failed = results.filter(r => r.status === 'rejected').length
  return NextResponse.json({ ok: true, total: tenants.length, failed })
}
