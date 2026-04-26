import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { assertTenant } from '@/lib/tenant'
import { db } from '@/lib/db'
import { z } from 'zod'

const UpdateSchema = z.object({
  status: z.enum(['NOVO', 'QUALIFICADO', 'AGENDADO', 'PERDIDO']).optional(),
})

export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await getSession()
  const tenantId = assertTenant(session?.user?.tenantId)

  const parsed = UpdateSchema.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })

  const lead = await db.lead.findFirst({ where: { id: params.id, tenantId } })
  if (!lead) return NextResponse.json({ error: 'Lead não encontrado' }, { status: 404 })

  const updated = await db.lead.update({
    where: { id: params.id },
    data: parsed.data,
  })

  return NextResponse.json({ lead: updated })
}
