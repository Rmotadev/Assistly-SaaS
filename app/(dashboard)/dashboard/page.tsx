import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'

export default async function DashboardPage() {
  const session = await getSession()
  if (!session?.user?.tenantId) redirect('/onboarding')
  const tenantId = session.user.tenantId
  const tenant = await db.tenant.findUnique({ where: { id: tenantId } })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Olá, {session?.user?.name ?? session?.user?.email}</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm text-gray-500">Plano atual</p>
          <p className="text-xl font-semibold mt-1">{tenant?.plano}</p>
        </div>
      </div>
    </div>
  )
}
