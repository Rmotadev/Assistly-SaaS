import { Resend } from 'resend'
import { InvoiceSummary } from './analyzer'

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key')

export interface SendReportEmailParams {
  to: string
  nome: string
  tenantNome: string
  semanaInicio: Date
  semanaFim: Date
  pdfBuffer: Buffer
  summary: InvoiceSummary
}

export function buildReportEmailHtml(params: Omit<SendReportEmailParams, 'to' | 'pdfBuffer'>): string {
  const { nome, tenantNome, semanaInicio, semanaFim, summary } = params
  const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const fmtDate = (d: Date) => d.toLocaleDateString('pt-BR')
  const saldoColor = summary.saldoSemana >= 0 ? '#059669' : '#dc2626'

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #374151;">
  <div style="background: #171e19; padding: 24px; border-radius: 8px 8px 0 0;">
    <h1 style="color: #ffe17c; margin: 0; font-size: 20px; text-transform: uppercase;">Assistly</h1>
    <p style="color: #b7c6c2; margin: 4px 0 0;">Relatório Semanal — ${tenantNome}</p>
  </div>
  <div style="background: #f9fafb; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
    <p style="margin-top: 0;">Olá, <strong>${nome}</strong></p>
    <p>Seu relatório de <strong>${fmtDate(semanaInicio)}</strong> a <strong>${fmtDate(semanaFim)}</strong> está pronto.</p>

    <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
      <tr style="background: white; border: 1px solid #e5e7eb;">
        <td style="padding: 12px 16px; color: #6b7280;">Entradas</td>
        <td style="padding: 12px 16px; text-align: right; font-weight: bold; color: #059669;">${fmt(summary.totalEntradas)}</td>
      </tr>
      <tr style="background: #f9fafb; border: 1px solid #e5e7eb;">
        <td style="padding: 12px 16px; color: #6b7280;">Saídas</td>
        <td style="padding: 12px 16px; text-align: right; font-weight: bold; color: #dc2626;">${fmt(summary.totalSaidas)}</td>
      </tr>
      <tr style="background: white; border: 1px solid #e5e7eb;">
        <td style="padding: 12px 16px; color: #6b7280;">Saldo</td>
        <td style="padding: 12px 16px; text-align: right; font-weight: bold; color: ${saldoColor};">${fmt(summary.saldoSemana)}</td>
      </tr>
      <tr style="background: #f9fafb; border: 1px solid #e5e7eb;">
        <td style="padding: 12px 16px; color: #6b7280;">Impostos</td>
        <td style="padding: 12px 16px; text-align: right; font-weight: bold; color: #d97706;">${fmt(summary.totalImpostos)}</td>
      </tr>
      <tr style="background: white; border: 1px solid #e5e7eb;">
        <td style="padding: 12px 16px; color: #6b7280;">NFs Processadas</td>
        <td style="padding: 12px 16px; text-align: right; font-weight: bold;">${summary.totalNfs}</td>
      </tr>
    </table>

    <p style="color: #6b7280; font-size: 13px;">O PDF completo está em anexo.</p>
    <p style="color: #6b7280; font-size: 12px; margin-bottom: 0;">Gerado automaticamente pelo Assistly</p>
  </div>
</body>
</html>`
}

export async function sendReportEmail(params: SendReportEmailParams) {
  const { to, pdfBuffer, semanaInicio, semanaFim } = params
  const fmtDate = (d: Date) => d.toLocaleDateString('pt-BR')

  await resend.emails.send({
    from: 'Assistly <relatorios@assistly.com.br>',
    to,
    subject: `Relatório Semanal ${fmtDate(semanaInicio)} – ${fmtDate(semanaFim)} | ${params.tenantNome}`,
    html: buildReportEmailHtml(params),
    attachments: [
      {
        filename: `relatorio-${fmtDate(semanaInicio).replace(/\//g, '-')}.pdf`,
        content: pdfBuffer,
      },
    ],
  })
}
