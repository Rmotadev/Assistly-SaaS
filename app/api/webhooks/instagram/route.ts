import { NextRequest, NextResponse } from 'next/server'
import { processInstagramMessage } from '@/agents/leads/channels/instagram'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === process.env.INSTAGRAM_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 })
  }
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  try {
    const entry = body?.entry?.[0]
    const messaging = entry?.messaging?.[0]

    if (!messaging?.message?.text) {
      return NextResponse.json({ status: 'ignored' })
    }

    const senderId = messaging.sender?.id
    const text = messaging.message.text
    const instagramAccountId = entry?.id

    if (!instagramAccountId) return NextResponse.json({ status: 'no_account_id' })

    const tenant = await db.tenant.findUnique({
      where: { instagramUserId: instagramAccountId },
      select: { id: true, plano: true },
    })

    if (!tenant) return NextResponse.json({ status: 'no_tenant' })
    const tenantId = tenant.id

    if (tenant?.plano !== 'COMPLETO') {
      return NextResponse.json({ status: 'plan_not_supported' })
    }

    const resposta = await processInstagramMessage({ senderId, text, tenantId })

    if (resposta) {
      await enviarMensagemInstagram(senderId, resposta)
    }

    return NextResponse.json({ status: 'ok' })
  } catch (err) {
    console.error('Instagram webhook error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

async function enviarMensagemInstagram(recipientId: string, texto: string) {
  await fetch(
    `https://graph.facebook.com/v17.0/me/messages`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.INSTAGRAM_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: { text: texto },
        messaging_type: 'RESPONSE',
      }),
    }
  )
}
