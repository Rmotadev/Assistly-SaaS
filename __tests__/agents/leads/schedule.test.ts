import { isDuranteExpediente } from '@/agents/leads/schedule'

describe('isDuranteExpediente', () => {
  it('returns true when time is within business hours', () => {
    // 14:00 entre 09:00 e 18:00
    expect(isDuranteExpediente('09:00', '18:00', new Date('2026-04-24T14:00:00-03:00'))).toBe(true)
  })

  it('returns false when time is before business hours', () => {
    // 07:00 antes de 09:00
    expect(isDuranteExpediente('09:00', '18:00', new Date('2026-04-24T07:00:00-03:00'))).toBe(false)
  })

  it('returns false when time is after business hours', () => {
    // 20:00 depois de 18:00
    expect(isDuranteExpediente('09:00', '18:00', new Date('2026-04-24T20:00:00-03:00'))).toBe(false)
  })

  it('returns true at exactly opening time', () => {
    expect(isDuranteExpediente('09:00', '18:00', new Date('2026-04-24T09:00:00-03:00'))).toBe(true)
  })

  it('returns false at exactly closing time', () => {
    expect(isDuranteExpediente('09:00', '18:00', new Date('2026-04-24T18:00:00-03:00'))).toBe(false)
  })
})
