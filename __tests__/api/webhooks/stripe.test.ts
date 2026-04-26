process.env.STRIPE_SECRET_KEY = 'sk_test_mock'
import Stripe from 'stripe'
import { handleStripeEvent } from '@/app/api/webhooks/stripe/handler'

jest.mock('@/lib/db', () => ({ db: { tenant: { findUnique: jest.fn(), update: jest.fn() } } }))
import { db } from '@/lib/db'

describe('handleStripeEvent', () => {
  beforeEach(() => jest.clearAllMocks())

  it('updates tenant on checkout.session.completed', async () => {
    ;(db.tenant.update as jest.Mock).mockResolvedValue({})
    process.env.STRIPE_PRICE_ESSENCIAL = 'price_essencial'
    await handleStripeEvent({ type: 'checkout.session.completed', data: { object: { subscription: 'sub_123', customer: 'cus_123', metadata: { tenantId: 'tenant_1' } } } } as unknown as Stripe.Event)
    expect(db.tenant.update).toHaveBeenCalledWith({ where: { id: 'tenant_1' }, data: expect.objectContaining({ stripeSubscriptionId: 'sub_123' }) })
  })

  it('updates stripeStatus on subscription.updated', async () => {
    ;(db.tenant.update as jest.Mock).mockResolvedValue({})
    await handleStripeEvent({ type: 'customer.subscription.updated', data: { object: { id: 'sub_123', status: 'active', customer: 'cus_123', items: { data: [{ price: { id: 'price_completo' } }] } } } } as unknown as Stripe.Event)
    expect(db.tenant.update).toHaveBeenCalledWith({ where: { stripeSubscriptionId: 'sub_123' }, data: expect.objectContaining({ stripeStatus: 'active' }) })
  })
})
