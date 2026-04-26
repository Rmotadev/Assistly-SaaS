import { assertTenant } from '@/lib/tenant'

describe('assertTenant', () => {
  it('returns tenantId when valid string', () => {
    expect(assertTenant('tenant_123')).toBe('tenant_123')
  })

  it('throws when tenantId is undefined', () => {
    expect(() => assertTenant(undefined)).toThrow('Tenant não encontrado na sessão')
  })

  it('throws when tenantId is empty string', () => {
    expect(() => assertTenant('')).toThrow('Tenant não encontrado na sessão')
  })
})
