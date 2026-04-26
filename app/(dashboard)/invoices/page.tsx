import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { assertTenant } from '@/lib/tenant'
import { InvoicesClient } from './InvoicesClient'

export default async function InvoicesPage() {
  const session = await getSession()
  const tenantId = assertTenant(session?.user?.tenantId)

  const invoices = await db.invoice.findMany({
    where: { tenantId },
    orderBy: { criadoEm: 'desc' },
    take: 20,
  })


  return <InvoicesClient invoices={invoices} />
}
