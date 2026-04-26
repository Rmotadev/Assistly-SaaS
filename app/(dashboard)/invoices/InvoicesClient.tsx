'use client'
import { useState } from 'react'
import { Invoice } from '@prisma/client'

const STATUS_LABELS = {
  PENDENTE: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
  PROCESSANDO: { label: 'Processando', color: 'bg-blue-100 text-blue-800' },
  PROCESSADO: { label: 'Processado', color: 'bg-green-100 text-green-800' },
  ERRO: { label: 'Erro', color: 'bg-red-100 text-red-800' },
}

export function InvoicesClient({ invoices }: { invoices: Invoice[] }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError(null)
    const form = new FormData()
    form.append('file', file)
    const res = await fetch('/api/invoices/upload', { method: 'POST', body: form })
    const data = await res.json()
    if (!res.ok) setError(data.error)
    else window.location.reload()
    setUploading(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notas Fiscais</h1>
        <label className={`cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}>
          {uploading ? 'Enviando...' : 'Upload NF'}
          <input type="file" accept=".xml,.pdf" onChange={handleUpload} disabled={uploading} className="hidden" />
        </label>
      </div>
      <p className="text-xs text-gray-400 mt-2 mb-6">Formatos aceitos: XML da NF-e ou PDF (digital/OCR).</p>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-sm">{error}</div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Número NF</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">CNPJ Emitente</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Tipo</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Data</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Valor</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {invoices.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-12 text-gray-400">Nenhuma NF ainda. Faça o primeiro upload.</td></tr>
            ) : invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono">{inv.numeroNf}</td>
                <td className="px-4 py-3 font-mono text-xs">{inv.cnpjEmitente}</td>
                <td className="px-4 py-3 text-xs">
                  <span className="capitalize">{inv.tipo.toLowerCase().replace('_', ' ')}</span>
                </td>
                <td className="px-4 py-3">{new Date(inv.dataEmissao).toLocaleDateString('pt-BR')}</td>
                <td className="px-4 py-3 text-right font-medium">
                  {Number(inv.valorTotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_LABELS[inv.status as keyof typeof STATUS_LABELS]?.color}`}>
                    {STATUS_LABELS[inv.status as keyof typeof STATUS_LABELS]?.label}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  {inv.status === 'PROCESSADO' && (
                    <button
                      onClick={async () => {
                        const res = await fetch(`/api/invoices/${inv.id}/export`, { method: 'POST' })
                        if (res.ok) alert('Exportação solicitada com sucesso!')
                        else alert('Falha ao exportar. Verifique as configurações.')
                      }}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded border border-gray-300 transition-colors"
                    >
                      Exportar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
