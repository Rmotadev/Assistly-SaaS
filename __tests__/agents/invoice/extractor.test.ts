import { parseExtractedInvoice } from '@/agents/invoice/extractor'

describe('parseExtractedInvoice', () => {
  it('parses valid invoice JSON from Claude response', () => {
    const claudeResponse = JSON.stringify({
      numeroNf: '000123',
      cnpjEmitente: '12.345.678/0001-90',
      cnpjDestinatario: '98.765.432/0001-10',
      dataEmissao: '2026-04-20',
      valorTotal: 1500.00,
      tipo: 'SAIDA_SERVICO',
      impostos: { iss: 75.00, pis: 9.75, cofins: 45.00 },
    })
    const result = parseExtractedInvoice(claudeResponse)
    expect(result.numeroNf).toBe('000123')
    expect(result.valorTotal).toBe(1500.00)
    expect(result.tipo).toBe('SAIDA_SERVICO')
    expect(result.impostos.iss).toBe(75.00)
  })

  it('throws on invalid JSON', () => {
    expect(() => parseExtractedInvoice('not json')).toThrow('Falha ao parsear resposta do Claude')
  })

  it('throws when tipo is invalid enum', () => {
    const bad = JSON.stringify({ numeroNf: '1', cnpjEmitente: '1', cnpjDestinatario: '1', dataEmissao: '2026-01-01', valorTotal: 100, tipo: 'INVALIDO', impostos: {} })
    expect(() => parseExtractedInvoice(bad)).toThrow()
  })
})
