import Stripe from 'stripe'
import { Plano } from '@prisma/client'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiVersion: '2024-06-20' as any
})

export const PLANS = {
  ESSENCIAL: { nome: 'Essencial', precoMensal: 29700, limitNfs: 500, agenteLeads: false, stripePriceId: process.env.STRIPE_PRICE_ESSENCIAL! },
  COMPLETO: { nome: 'Completo', precoMensal: 49700, limitNfs: null, agenteLeads: true, stripePriceId: process.env.STRIPE_PRICE_COMPLETO! },
} as const

export function getPlanFromPriceId(priceId: string): Plano | null {
  if (priceId === process.env.STRIPE_PRICE_ESSENCIAL) return 'ESSENCIAL'
  if (priceId === process.env.STRIPE_PRICE_COMPLETO) return 'COMPLETO'
  return null
}

export async function createStripeCustomer(email: string, nome: string) {
  return stripe.customers.create({ email, name: nome, metadata: { source: 'assistly' } })
}

export async function createCheckoutSession({ stripeCustomerId, priceId, tenantId, successUrl, cancelUrl }: { stripeCustomerId: string; priceId: string; tenantId: string; successUrl: string; cancelUrl: string }) {
  return stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: { trial_period_days: 14, metadata: { tenantId } },
    success_url: successUrl,
    cancel_url: cancelUrl,
  })
}
