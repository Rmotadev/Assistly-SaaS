import { db } from '@/lib/db'

export function assertTenant(tenantId: string | undefined | null): string {
  if (!tenantId) throw new Error('Tenant não encontrado na sessão')
  return tenantId
}

export async function getTenantById(tenantId: string) {
  return db.tenant.findUnique({ where: { id: tenantId } })
}

export async function getTenantByStripeCustomerId(stripeCustomerId: string) {
  return db.tenant.findUnique({ where: { stripeCustomerId } })
}
