import { NextRequest, NextResponse } from 'next/server'
import { processWhatsAppMessage } from '@/agents/leads/channels/whatsapp'
import { db } from '@/lib/db'

// Verifica token do WhatsApp Business API (challenge de verificação)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 })
  }
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  // WhatsApp Cloud API payload format
  try {
    const entry = body?.entry?.[0]
    const changes = entry?.changes?.[0]
    const message = changes?.value?.messages?.[0]

    if (!message || message.type !== 'text') {
      return NextResponse.json({ status: 'ignored' })
    }

    const from = message.from // número do remetente
    const text = message.text?.body ?? ''

    // Busca tenant pelo phoneNumberId vindo do WhatsApp
    const phoneNumberId = changes?.value?.metadata?.phone_number_id
    if (!phoneNumberId) return NextResponse.json({ status: 'no_metadata' })

    const tenant = await db.tenant.findUnique({
      where: { whatsappPhoneNumberId: phoneNumberId },
      select: { id: true, plano: true },
    })

    if (!tenant) return NextResponse.json({ status: 'no_tenant' })
    const tenantId = tenant.id

    if (tenant?.plano !== 'COMPLETO') {
      return NextResponse.json({ status: 'plan_not_supported' })
    }

    const resposta = await processWhatsAppMessage({ from, body: text, tenantId })

    // Enviar resposta via WhatsApp Cloud API
    if (resposta) {
      await enviarMensagemWhatsApp(from, resposta)
    }

    return NextResponse.json({ status: 'ok' })
  } catch (_err) {
    console.error('WhatsApp webhook error:', _err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

async function enviarMensagemWhatsApp(to: string, texto: string) {
  await fetch(
    `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: to.replace('whatsapp:', ''),
        type: 'text',
        text: { body: texto },
      }),
    }
  )
}
