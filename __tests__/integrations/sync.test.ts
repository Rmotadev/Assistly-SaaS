import { getIntegrationForTenant } from '@/integrations/sync'

jest.mock('@/lib/db', () => ({
  db: {
    integration: { findFirst: jest.fn() },
    invoice: { findUnique: jest.fn() },
  },
}))
import { db } from '@/lib/db'

describe('getIntegrationForTenant', () => {
  it('returns null when no integration found', async () => {
    ;(db.integration.findFirst as jest.Mock).mockResolvedValue(null)
    const result = await getIntegrationForTenant('tenant_1')
    expect(result).toBeNull()
  })

  it('returns integration when found', async () => {
    const mock = { id: 'int_1', tenantId: 'tenant_1', sistema: 'CONTAAZUL', ativo: true }
    ;(db.integration.findFirst as jest.Mock).mockResolvedValue(mock)
    const result = await getIntegrationForTenant('tenant_1')
    expect(result?.sistema).toBe('CONTAAZUL')
  })
})
