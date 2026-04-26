import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { handleStripeEvent } from './handler'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  let event
  try { event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!) }
  catch { return NextResponse.json({ error: 'Webhook signature invalid' }, { status: 400 }) }
  try { await handleStripeEvent(event); return NextResponse.json({ received: true }) }
  catch (err) { console.error('Stripe webhook error:', err); return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 }) }
}
