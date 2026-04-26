process.env.RESEND_API_KEY = 're_test'
import { buildReportEmailHtml } from '@/agents/report/mailer'

describe('buildReportEmailHtml', () => {
  it('contains tenant name', () => {
    const html = buildReportEmailHtml({
      nome: 'João',
      tenantNome: 'Contabilidade Silva',
      semanaInicio: new Date('2026-04-14'),
      semanaFim: new Date('2026-04-18'),
      summary: { totalEntradas: 5000, totalSaidas: 2000, saldoSemana: 3000, totalImpostos: 450, totalNfs: 12 },
    })
    expect(html).toContain('Contabilidade Silva')
    expect(html).toContain('João')
    expect(html).toContain('R$')
  })
})
