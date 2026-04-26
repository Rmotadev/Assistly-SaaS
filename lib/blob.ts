import { put } from '@vercel/blob'

export async function uploadBlob(
  path: string,
  buffer: Buffer,
  contentType: string
): Promise<string> {
  const blob = await put(path, buffer, {
    access: 'private',
    contentType,
  })
  return blob.url
}

export function getBlobPath(tenantId: string, tipo: 'invoices' | 'reports', filename: string): string {
  return `assistly/${tenantId}/${tipo}/${filename}`
}
