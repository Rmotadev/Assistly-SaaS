import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

const QualificacaoSchema = z.object({
  servicoInteresse: z.string(),
  porteEmpresa: z.string(),
  urgencia: z.enum(['baixa', 'media', 'alta']),
  resumo: z.string(),
})

export type Qualificacao = z.infer<typeof QualificacaoSchema>

export function parseQualificacao(raw: string): Qualificacao {
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    throw new Error('Falha ao parsear qualificação')
  }
  return QualificacaoSchema.parse(parsed)
}

export async function qualificarLead(mensagens: string[]): Promise<Qualificacao> {
  const conversa = mensagens.join('\n')

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 512,
    messages: [{
      role: 'user',
      content: `Analise esta conversa com um lead para um escritório de contabilidade e extraia as informações de qualificação no formato JSON (sem markdown, só JSON puro):
{
  "servicoInteresse": "serviço que o lead quer (ex: abertura de empresa, declaração IR, contabilidade mensal, MEI, outro)",
  "porteEmpresa": "porte estimado (MEI, microempresa, pequena empresa, média empresa, pessoa física, não identificado)",
  "urgencia": "baixa | media | alta",
  "resumo": "resumo em 1-2 frases do que o lead precisa"
}

Conversa:
${conversa}`,
    }],
  })

  const content = message.content[0]
  if (content.type !== 'text') throw new Error('Resposta inesperada do Claude')
  return parseQualificacao(content.text)
}

const RESPOSTA_PROMPT = `Você é um assistente virtual de um escritório de contabilidade brasileiro.
Responda de forma profissional, cordial e concisa em português do Brasil.
Seu objetivo: entender o que o cliente precisa e informar que um contador entrará em contato no próximo dia útil.
Faça no máximo UMA pergunta por mensagem para entender melhor a necessidade.
Não prometa valores nem prazos específicos. Não finalize a conversa — apenas colete informações e confirme que o contador retornará.`

export async function gerarRespostaLead(
  mensagens: Array<{ role: 'user' | 'assistant'; content: string }>,
  tenantNome: string
): Promise<string> {
  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 256,
    system: `${RESPOSTA_PROMPT}\nEscritório: ${tenantNome}`,
    messages: mensagens,
  })

  const content = message.content[0]
  if (content.type !== 'text') throw new Error('Resposta inesperada do Claude')
  return content.text
}
