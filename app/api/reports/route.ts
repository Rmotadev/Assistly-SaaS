import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { assertTenant } from '@/lib/tenant'
import { db } from '@/lib/db'

export async function GET() {
  const session = await getSession()
  const tenantId = assertTenant(session?.user?.tenantId)

  const reports = await db.report.findMany({
    where: { tenantId },
    orderBy: { semanaInicio: 'desc' },
    take: 20,
    select: {
      id: true,
      semanaInicio: true,
      semanaFim: true,
      pdfS3Url: true,
      enviadoEm: true,
      criadoEm: true,
    },
  })

  return NextResponse.json({ reports })
}
