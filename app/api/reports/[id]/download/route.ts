import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { assertTenant } from '@/lib/tenant'
import { db } from '@/lib/db'

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await getSession()
  const tenantId = assertTenant(session?.user?.tenantId)

  const report = await db.report.findFirst({
    where: { id: params.id, tenantId },
  })

  if (!report?.pdfS3Url) {
    return NextResponse.json({ error: 'Relatório não encontrado' }, { status: 404 })
  }

  return NextResponse.redirect(report.pdfS3Url)
}
