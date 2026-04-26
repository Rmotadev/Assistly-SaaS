import { generateReportPdf } from '@/agents/report/pdf-generator'

describe('generateReportPdf', () => {
  it('returns a Buffer', async () => {
    const result = await generateReportPdf({
      tenantNome: 'Escritório Teste',
      semanaInicio: new Date('2026-04-14'),
      semanaFim: new Date('2026-04-18'),
      totalEntradas: 5000,
      totalSaidas: 2000,
      saldoSemana: 3000,
      totalImpostos: 450,
      totalNfs: 12,
      alertas: ['NF duplicada detectada: 000123'],
      analiseTexto: 'Semana positiva. Entradas superiores às saídas.',
    })
    expect(result).toBeInstanceOf(Buffer)
    expect(result.length).toBeGreaterThan(0)
  })
})
