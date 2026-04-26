import { isDuranteExpediente } from './schedule'

describe('isDuranteExpediente', () => {
  it('deve retornar true durante o expediente em um dia de semana', () => {
    // 21/04/2026 é Terça-feira
    const terca = new Date('2026-04-21T14:00:00-03:00')
    expect(isDuranteExpediente('09:00', '18:00', terca)).toBe(true)
  })

  it('deve retornar false fora do expediente em um dia de semana', () => {
    const tercaNoite = new Date('2026-04-21T20:00:00-03:00')
    expect(isDuranteExpediente('09:00', '18:00', tercaNoite)).toBe(false)
  })

  it('deve retornar false no Sábado, mesmo dentro do horário comercial', () => {
    // 25/04/2026 é Sábado
    const sabado = new Date('2026-04-25T14:00:00-03:00')
    expect(isDuranteExpediente('09:00', '18:00', sabado)).toBe(false)
  })

  it('deve retornar false no Domingo, mesmo dentro do horário comercial', () => {
    // 26/04/2026 é Domingo
    const domingo = new Date('2026-04-26T14:00:00-03:00')
    expect(isDuranteExpediente('09:00', '18:00', domingo)).toBe(false)
  })
})
