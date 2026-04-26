import { buildReportSummary } from '@/agents/report/analyzer'
import { Invoice } from '@prisma/client'

describe('buildReportSummary', () => {
  it('calculates totals correctly', () => {
    const invoices = [
      { tipo: 'ENTRADA_PRODUTO', valorTotal: { toNumber: () => 1000 }, impostosJson: { icms: 100 } },
      { tipo: 'SAIDA_SERVICO', valorTotal: { toNumber: () => 500 }, impostosJson: { iss: 25 } },
      { tipo: 'ENTRADA_SERVICO', valorTotal: { toNumber: () => 2000 }, impostosJson: { iss: 100 } },
    ] as unknown as Invoice[]

    const summary = buildReportSummary(invoices)
    expect(summary.totalEntradas).toBe(3000)
    expect(summary.totalSaidas).toBe(500)
    expect(summary.saldoSemana).toBe(2500)
    expect(summary.totalImpostos).toBe(225)
    expect(summary.totalNfs).toBe(3)
  })

  it('returns zeros for empty invoice list', () => {
    const summary = buildReportSummary([])
    expect(summary.totalEntradas).toBe(0)
    expect(summary.totalSaidas).toBe(0)
    expect(summary.saldoSemana).toBe(0)
    expect(summary.totalImpostos).toBe(0)
  })
})
