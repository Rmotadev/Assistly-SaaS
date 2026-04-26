import { db } from '@/lib/db'

export interface NotificationPayload {
  title: string
  body: string
  leadId: string
  tenantId: string
  canal: string
  contato: string
}

export function buildNotificationPayload(params: {
  tenantId: string
  leadId: string
  canal: 'WHATSAPP' | 'INSTAGRAM'
  contato: string
  ultimaMensagem: string
}): NotificationPayload {
  const canalLabel = params.canal === 'WHATSAPP' ? 'WhatsApp' : 'Instagram'
  const contatoLabel = params.canal === 'WHATSAPP'
    ? params.contato.replace('whatsapp:', '')
    : `Instagram ID: ${params.contato}`

  return {
    title: `Novo lead via ${canalLabel}`,
    body: `${contatoLabel}: "${params.ultimaMensagem.slice(0, 80)}${params.ultimaMensagem.length > 80 ? '...' : ''}"`,
    leadId: params.leadId,
    tenantId: params.tenantId,
    canal: params.canal,
    contato: params.contato,
  }
}

export async function notificarContador(
  tenantId: string,
  leadId: string,
  canal: 'WHATSAPP' | 'INSTAGRAM',
  contato: string,
  ultimaMensagem: string
) {
  const payload = buildNotificationPayload({ tenantId, leadId, canal, contato, ultimaMensagem })

  // Busca owners do tenant para notificar
  const owners = await db.user.findMany({
    where: { tenantId, role: { in: ['OWNER', 'ADMIN'] } },
    select: { email: true },
  })

  // Loga notificação (em produção: push notification ou e-mail)
  // Implementação de push notification depende do provider escolhido (OneSignal, Firebase, etc.)
  console.log(`[NOTIFICAÇÃO] Tenant ${tenantId}:`, payload)
  console.log(`[NOTIFICAÇÃO] Destinatários:`, owners.map(o => o.email))

  return payload
}
