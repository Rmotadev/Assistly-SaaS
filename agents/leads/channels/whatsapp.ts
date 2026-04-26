import { db } from '@/lib/db'
import { isDuranteExpediente } from '@/agents/leads/schedule'
import { gerarRespostaLead, qualificarLead } from '@/agents/leads/qualifier'
import { notificarContador } from '@/agents/leads/notifier'
import { LeadMessage } from '@/types/leads'

export interface WhatsAppMessage {
  from: string       // número no formato whatsapp:+5511999999999
  body: string
  tenantId: string
}

export async function processWhatsAppMessage(msg: WhatsAppMessage) {
  const { from, body, tenantId } = msg

  const tenant = await db.tenant.findUnique({ where: { id: tenantId } })
  if (!tenant) throw new Error(`Tenant ${tenantId} não encontrado`)

  // Verifica se está dentro do expediente
  const dentroExpediente = isDuranteExpediente(
    tenant.horarioExpedienteInicio,
    tenant.horarioExpedienteFim
  )

  // Busca ou cria lead
  let lead = await db.lead.findFirst({
    where: { tenantId, canal: 'WHATSAPP', contato: from },
    orderBy: { criadoEm: 'desc' },
  })

  const mensagens = (lead?.mensagensJson as unknown as LeadMessage[]) || []

  mensagens.push({ role: 'user', content: body })

  let isNew = false
  if (!lead) {
    isNew = true
    lead = await db.lead.create({
      data: {
        tenantId,
        canal: 'WHATSAPP',
        contato: from,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mensagensJson: mensagens as any,
        status: 'NOVO',
      },
    })
    // Notifica sobre novo lead imediatamente
    await notificarContador(tenantId, lead.id, 'WHATSAPP', from, body)
  } else {
    await db.lead.update({
      where: { id: lead.id },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: { mensagensJson: mensagens as any },
    })
  }

  if (dentroExpediente) {
    // Durante expediente: apenas registra e notifica (se não for novo)
    if (!isNew) {
       await notificarContador(tenantId, lead.id, 'WHATSAPP', from, body)
    }
    return null
  }

  // Fora do expediente: Claude responde
  const historicoParaClaude = mensagens.map(m => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }))

  const resposta = await gerarRespostaLead(historicoParaClaude, tenant.nome)

  // Salva resposta no histórico
  mensagens.push({ role: 'assistant', content: resposta })
  await db.lead.update({
    where: { id: lead.id },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { mensagensJson: mensagens as any },
  })

  // Qualifica após 2+ trocas de mensagens
  if (mensagens.filter(m => m.role === 'user').length >= 2) {
    const textosMensagens = mensagens.map(m => `${m.role}: ${m.content}`)
    const qualificacao = await qualificarLead(textosMensagens)
    await db.lead.update({
      where: { id: lead.id },
      data: {
        qualificacaoJson: qualificacao,
        status: 'QUALIFICADO',
      },
    })
    await notificarContador(tenantId, lead.id, 'WHATSAPP', from, body)
  }

  return resposta
}
