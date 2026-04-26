import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

const InvoiceSchema = z.object({
  numeroNf: z.string(),
  cnpjEmitente: z.string(),
  cnpjDestinatario: z.string(),
  dataEmissao: z.string(),
  valorTotal: z.number(),
  tipo: z.enum(['ENTRADA_PRODUTO', 'SAIDA_PRODUTO', 'ENTRADA_SERVICO', 'SAIDA_SERVICO']),
  impostos: z.object({
    icms: z.number().nullable().optional(),
    pis: z.number().nullable().optional(),
    cofins: z.number().nullable().optional(),
    iss: z.number().nullable().optional(),
  }),
})

export type ExtractedInvoice = z.infer<typeof InvoiceSchema>

export function parseExtractedInvoice(raw: string): ExtractedInvoice {
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    throw new Error('Falha ao parsear resposta do Claude')
  }
  return InvoiceSchema.parse(parsed)
}

const EXTRACTION_PROMPT = `Você é um extrator especializado em notas fiscais brasileiras (NF-e e NFS-e).
Sua tarefa é analisar o texto abaixo, que pode vir de um XML ou de um OCR de PDF (e por isso pode ter ruídos, caracteres trocados ou falta de espaços).

Extraia os dados no seguinte formato JSON puro:
{
  "numeroNf": "número da NF",
  "cnpjEmitente": "CNPJ do emitente (formato: XX.XXX.XXX/XXXX-XX)",
  "cnpjDestinatario": "CNPJ do destinatário (formato: XX.XXX.XXX/XXXX-XX)",
  "dataEmissao": "data no formato YYYY-MM-DD",
  "valorTotal": número_decimal,
  "tipo": "ENTRADA_PRODUTO | SAIDA_PRODUTO | ENTRADA_SERVICO | SAIDA_SERVICO",
  "impostos": {
    "icms": número_decimal_ou_null,
    "pis": número_decimal_ou_null,
    "cofins": número_decimal_ou_null,
    "iss": número_decimal_ou_null
  }
}

Regras Críticas:
1. Limpe os CNPJs: remova qualquer caractere que não seja número ou pontuação padrão.
2. Identifique o TIPO:
   - SAIDA: A empresa do usuário é a EMITENTE.
   - ENTRADA: A empresa do usuário é a DESTINATÁRIA.
   - SERVICO: Se houver incidência de ISS ou se for uma NFS-e.
3. Se o valor total tiver vírgula como separador decimal no texto, converta para ponto no JSON.
4. Responda APENAS o JSON.`

export async function extractInvoiceFromText(ocrText: string): Promise<ExtractedInvoice> {
  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    messages: [
      { role: 'user', content: `${EXTRACTION_PROMPT}\n\nTexto da nota fiscal:\n${ocrText}` },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') throw new Error('Resposta inesperada do Claude')

  return parseExtractedInvoice(content.text)
}
