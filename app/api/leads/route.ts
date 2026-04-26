import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { assertTenant } from '@/lib/tenant'
import { db } from '@/lib/db'
import { StatusLead } from '@prisma/client'

export async function GET(req: NextRequest) {
  const session = await getSession()
  const tenantId = assertTenant(session?.user?.tenantId)

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')

  const leads = await db.lead.findMany({
    where: {
      tenantId,
      ...(status ? { status: status as StatusLead } : {}),
    },
    orderBy: { criadoEm: 'desc' },
    take: 50,
  })

  return NextResponse.json({ leads })
}
