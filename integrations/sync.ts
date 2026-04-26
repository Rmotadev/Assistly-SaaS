import { db } from '@/lib/db'
import { Invoice } from '@prisma/client'

export async function getIntegrationForTenant(tenantId: string) {
  return db.integration.findFirst({
    where: { tenantId, ativo: true },
  })
}

export async function syncInvoiceToIntegration(tenantId: string, invoiceId: string): Promise<{ success: boolean; error?: string }> {
  const integration = await getIntegrationForTenant(tenantId)
  if (!integration) return { success: true } // nada a fazer

  const invoice = await db.invoice.findUnique({ where: { id: invoiceId } })
  if (!invoice) return { success: false, error: 'NF não encontrada' }

  try {
    switch (integration.sistema) {
      case 'CONTAAZUL':
        await syncToContaAzul(integration.credentialsEncrypted, invoice)
        break
      case 'DOMINIO':
        await syncToDominio(integration.credentialsEncrypted, invoice)
        break
      case 'TOTVS':
        await syncToTotvs(integration.credentialsEncrypted, invoice)
        break
    }
    console.log(`[SYNC] NF ${invoice.numeroNf} exportada para ${integration.sistema} (Tenant: ${tenantId})`)
    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error(`[SYNC ERROR] Falha ao exportar NF ${invoice.numeroNf} para ${integration.sistema}:`, message)
    return { success: false, error: message }
  }
}

async function syncToContaAzul(credentials: string, invoice: Invoice) {
  const creds = JSON.parse(Buffer.from(credentials, 'base64').toString())
  const res = await fetch('https://api.contaazul.com/v2/lancamentos', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${creds.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      descricao: `NF ${invoice.numeroNf}`,
      valor: Number(invoice.valorTotal),
      data: invoice.dataEmissao.toISOString().split('T')[0],
      tipo: invoice.tipo.startsWith('ENTRADA') ? 'RECEITA' : 'DESPESA',
    }),
  })
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(`Erro ContaAzul (${res.status}): ${JSON.stringify(errorData)}`)
  }
}

async function syncToDominio(credentials: string, invoice: Invoice) {
  const creds = JSON.parse(Buffer.from(credentials, 'base64').toString())
  const res = await fetch(`${creds.base_url}/api/lancamentos`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${creds.usuario}:${creds.senha}`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nf: invoice.numeroNf,
      cnpj_emitente: invoice.cnpjEmitente,
      valor: Number(invoice.valorTotal),
      data: invoice.dataEmissao,
    }),
  })
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(`Erro Domínio (${res.status}): ${JSON.stringify(errorData)}`)
  }
}

async function syncToTotvs(credentials: string, invoice: Invoice) {
  const creds = JSON.parse(Buffer.from(credentials, 'base64').toString())
  const res = await fetch(`${creds.base_url}/api/framework/v1/businessObject/LNC/1`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${creds.usuario}:${creds.senha}`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      numeroNF: invoice.numeroNf,
      cnpjEmitente: invoice.cnpjEmitente,
      valor: Number(invoice.valorTotal),
    }),
  })
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(`Erro TOTVS (${res.status}): ${JSON.stringify(errorData)}`)
  }
}
