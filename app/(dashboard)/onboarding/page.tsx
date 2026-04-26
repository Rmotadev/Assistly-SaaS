import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { assertTenant } from '@/lib/tenant'
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard'

export default async function OnboardingPage() {
  const session = await getSession()
  const tenantId = assertTenant(session?.user?.tenantId)
  const tenant = await db.tenant.findUnique({ where: { id: tenantId } })

  if (tenant?.onboardingCompleto) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Bem-vindo ao Assistly</h1>
        <p className="text-gray-500 mt-2">Vamos configurar sua conta em 3 passos simples</p>
      </div>
      <OnboardingWizard plano={tenant?.plano ?? 'ESSENCIAL'} />
    </div>
  )
}
