import Anthropic from '@anthropic-ai/sdk'
import { Invoice } from '@prisma/client'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export interface InvoiceSummary {
  totalEntradas: number
  totalSaidas: number
  saldoSemana: number
  totalImpostos: number
  totalNfs: number
}

export function buildReportSummary(invoices: Invoice[]): InvoiceSummary {
  let totalEntradas = 0
  let totalSaidas = 0
  let totalImpostos = 0

  for (const inv of invoices) {
    const valor = typeof inv.valorTotal?.toNumber === 'function'
      ? inv.valorTotal.toNumber()
      : Number(inv.valorTotal)

    if (inv.tipo.startsWith('ENTRADA')) {
      totalEntradas += valor
    } else {
      totalSaidas += valor
    }

    const impostos = inv.impostosJson as Record<string, number | null> | null
    if (impostos) {
      totalImpostos += Object.values(impostos)
        .reduce((sum: number, v) => sum + (Number(v) || 0), 0)
    }
  }

  return {
    totalEntradas,
    totalSaidas,
    saldoSemana: totalEntradas - totalSaidas,
    totalImpostos,
    totalNfs: invoices.length,
  }
}

export function detectAlertas(invoices: Invoice[]): string[] {
  const alertas: string[] = []

  // NFs duplicadas (mesmo número)
  const numerosSeen = new Map<string, number>()
  for (const inv of invoices) {
    if (!inv.numeroNf || inv.numeroNf === 'PENDENTE') continue
    const count = (numerosSeen.get(inv.numeroNf) ?? 0) + 1
    numerosSeen.set(inv.numeroNf, count)
    if (count === 2) {
      alertas.push(`NF duplicada detectada: ${inv.numeroNf}`)
    }
  }

  // Valor atípico (acima de 10x a média)
  if (invoices.length > 2) {
    const valores = invoices.map(inv =>
      typeof inv.valorTotal?.toNumber === 'function'
        ? inv.valorTotal.toNumber()
        : Number(inv.valorTotal)
    )
    const media = valores.reduce((a, b) => a + b, 0) / valores.length
    for (const inv of invoices) {
      const valor = typeof inv.valorTotal?.toNumber === 'function'
        ? inv.valorTotal.toNumber()
        : Number(inv.valorTotal)
      if (valor > media * 10 && media > 0) {
        alertas.push(`Valor atípico na NF ${inv.numeroNf}: ${valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`)
      }
    }
  }

  return alertas
}

export async function generateAnaliseTexto(summary: InvoiceSummary, alertas: string[]): Promise<string> {
  const prompt = `Você é um analista financeiro de escritório contábil. Analise o resumo semanal abaixo e escreva um parágrafo conciso (3-5 frases) em português do Brasil, destacando os pontos mais importantes para o contador.

Dados da semana:
- Total de entradas: R$ ${summary.totalEntradas.toFixed(2)}
- Total de saídas: R$ ${summary.totalSaidas.toFixed(2)}
- Saldo: R$ ${summary.saldoSemana.toFixed(2)}
- Total de impostos: R$ ${summary.totalImpostos.toFixed(2)}
- Notas fiscais processadas: ${summary.totalNfs}
- Alertas: ${alertas.length === 0 ? 'nenhum' : alertas.join(', ')}

Seja direto e profissional. Não use markdown.`

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 512,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = message.content[0]
  if (content.type !== 'text') throw new Error('Resposta inesperada do Claude')
  return content.text
}
