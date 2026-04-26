import { getBlobPath } from '@/lib/blob'

describe('getBlobPath', () => {
  it('builds path for invoices', () => {
    expect(getBlobPath('tenant_1', 'invoices', 'nf.xml')).toBe('assistly/tenant_1/invoices/nf.xml')
  })

  it('builds path for reports', () => {
    expect(getBlobPath('tenant_1', 'reports', 'report.pdf')).toBe('assistly/tenant_1/reports/report.pdf')
  })
})
