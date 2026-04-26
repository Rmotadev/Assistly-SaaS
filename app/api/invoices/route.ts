import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { assertTenant } from '@/lib/tenant'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getSession()
  const tenantId = assertTenant(session?.user?.tenantId)

  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = 20
  const skip = (page - 1) * limit

  const [invoices, total] = await Promise.all([
    db.invoice.findMany({
      where: { tenantId },
      orderBy: { criadoEm: 'desc' },
      skip,
      take: limit,
      select: {
        id: true,
        numeroNf: true,
        cnpjEmitente: true,
        tipo: true,
        dataEmissao: true,
        valorTotal: true,
        status: true,
        criadoEm: true,
      },
    }),
    db.invoice.count({ where: { tenantId } }),
  ])

  return NextResponse.json({ invoices, total, page, pages: Math.ceil(total / limit) })
}
