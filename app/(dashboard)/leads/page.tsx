import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { assertTenant } from '@/lib/tenant'
import { LeadsClient } from './LeadsClient'

export default async function LeadsPage() {
  const session = await getSession()
  const tenantId = assertTenant(session?.user?.tenantId)

  const tenant = await db.tenant.findUnique({ where: { id: tenantId } })
  if (tenant?.plano !== 'COMPLETO') redirect('/dashboard')

  const leads = await db.lead.findMany({
    where: { tenantId },
    orderBy: { criadoEm: 'desc' },
    take: 50,
  })

  return <LeadsClient leads={leads} />
}
