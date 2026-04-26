import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { assertTenant } from '@/lib/tenant'
import { db } from '@/lib/db'
import { z } from 'zod'

const stepSchema = z.object({ step: z.number().min(1).max(5), data: z.record(z.string(), z.unknown()) })

export async function POST(req: NextRequest) {
  const session = await getSession()
  const tenantId = assertTenant(session?.user?.tenantId)
  const parsed = stepSchema.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
  
  const { step, data } = parsed.data
  
  if (step === 1) await db.tenant.update({ where: { id: tenantId }, data: { nome: data.nome as string, cnpj: data.cnpj as string | undefined } })
  if (step === 4) await db.tenant.update({ where: { id: tenantId }, data: { horarioExpedienteInicio: data.horarioInicio as string, horarioExpedienteFim: data.horarioFim as string } })
  if (step === 5) await db.tenant.update({ where: { id: tenantId }, data: { onboardingCompleto: true } })
  
  return NextResponse.json({ ok: true })
}
