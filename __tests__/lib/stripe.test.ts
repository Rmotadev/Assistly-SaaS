process.env.STRIPE_SECRET_KEY = 'sk_test_mock'
import { getPlanFromPriceId, PLANS } from '@/lib/stripe'

describe('getPlanFromPriceId', () => {
  it('returns ESSENCIAL', () => {
    process.env.STRIPE_PRICE_ESSENCIAL = 'price_essencial_test'
    expect(getPlanFromPriceId('price_essencial_test')).toBe('ESSENCIAL')
  })

  it('returns COMPLETO', () => {
    process.env.STRIPE_PRICE_COMPLETO = 'price_completo_test'
    expect(getPlanFromPriceId('price_completo_test')).toBe('COMPLETO')
  })

  it('returns null for unknown', () => {
    expect(getPlanFromPriceId('price_unknown')).toBeNull()
  })
})

describe('PLANS', () => {
  it('ESSENCIAL has correct properties', () => {
    expect(PLANS.ESSENCIAL.precoMensal).toBe(29700)
    expect(PLANS.ESSENCIAL.limitNfs).toBe(500)
    expect(PLANS.ESSENCIAL.agenteLeads).toBe(false)
  })

  it('COMPLETO has agenteLeads enabled', () => {
    expect(PLANS.COMPLETO.agenteLeads).toBe(true)
    expect(PLANS.COMPLETO.limitNfs).toBeNull()
  })
})
