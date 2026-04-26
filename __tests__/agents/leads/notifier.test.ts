import { buildNotificationPayload } from '@/agents/leads/notifier'

describe('buildNotificationPayload', () => {
  it('builds payload for WHATSAPP lead', () => {
    const payload = buildNotificationPayload({
      tenantId: 'tenant_1',
      leadId: 'lead_1',
      canal: 'WHATSAPP',
      contato: 'whatsapp:+5511999999999',
      ultimaMensagem: 'Quero abrir uma empresa',
    })
    expect(payload.title).toContain('WhatsApp')
    expect(payload.body).toContain('Quero abrir uma empresa')
    expect(payload.leadId).toBe('lead_1')
  })

  it('builds payload for INSTAGRAM lead', () => {
    const payload = buildNotificationPayload({
      tenantId: 'tenant_1',
      leadId: 'lead_1',
      canal: 'INSTAGRAM',
      contato: '123456789',
      ultimaMensagem: 'Preciso de contabilidade',
    })
    expect(payload.title).toContain('Instagram')
  })
})
