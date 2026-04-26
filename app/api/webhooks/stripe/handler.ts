import Stripe from 'stripe'
import { db } from '@/lib/db'
import { getPlanFromPriceId } from '@/lib/stripe'

export async function handleStripeEvent(event: Stripe.Event) {
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const tenantId = session.metadata?.tenantId
      if (!tenantId) break
      await db.tenant.update({ where: { id: tenantId }, data: { stripeSubscriptionId: session.subscription as string, stripeStatus: 'active' } })
      break
    }
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      const priceId = sub.items.data[0]?.price?.id
      const plano = priceId ? getPlanFromPriceId(priceId) : null
      await db.tenant.update({ where: { stripeSubscriptionId: sub.id }, data: { stripeStatus: sub.status, ...(plano && { plano }) } })
      break
    }
  }
}
