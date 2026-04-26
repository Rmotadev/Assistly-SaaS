import { parseQualificacao } from '@/agents/leads/qualifier'

describe('parseQualificacao', () => {
  it('parses valid qualificacao JSON', () => {
    const raw = JSON.stringify({
      servicoInteresse: 'Abertura de empresa',
      porteEmpresa: 'MEI',
      urgencia: 'alta',
      resumo: 'Cliente quer abrir MEI urgente',
    })
    const result = parseQualificacao(raw)
    expect(result.servicoInteresse).toBe('Abertura de empresa')
    expect(result.urgencia).toBe('alta')
  })

  it('throws on invalid JSON', () => {
    expect(() => parseQualificacao('not json')).toThrow('Falha ao parsear qualificação')
  })
})
