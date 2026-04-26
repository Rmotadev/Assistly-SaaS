import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { assertTenant } from '@/lib/tenant'
import { syncInvoiceToIntegration } from '@/integrations/sync'

export async function POST(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await getSession()
  const tenantId = assertTenant(session?.user?.tenantId)

  const result = await syncInvoiceToIntegration(tenantId, params.id)

  if (result.success) {
    return NextResponse.json({ ok: true })
  } else {
    return NextResponse.json({ error: result.error || 'Falha na exportação' }, { status: 500 })
  }
}
