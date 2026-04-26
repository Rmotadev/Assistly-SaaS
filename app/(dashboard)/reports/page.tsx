import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { assertTenant } from '@/lib/tenant'
import { ReportsClient } from './ReportsClient'

export default async function ReportsPage() {
  const session = await getSession()
  const tenantId = assertTenant(session?.user?.tenantId)

  const reports = await db.report.findMany({
    where: { tenantId },
    orderBy: { semanaInicio: 'desc' },
    take: 20,
  })

  return <ReportsClient reports={reports} />
}
