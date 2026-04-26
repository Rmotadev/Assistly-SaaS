'use client'
import { useState } from 'react'
import { Report } from '@prisma/client'

export function ReportsClient({ reports: initialReports }: { reports: Report[] }) {
  const [reports] = useState(initialReports)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function triggerReport() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/reports/trigger', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Falha ao gerar relatório')
      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  function formatDate(d: Date | string) {
    return new Date(d).toLocaleDateString('pt-BR')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Relatórios Semanais</h1>
          <p className="text-sm text-gray-500">Consolidação automática às sextas 17h</p>
        </div>
        <button
          onClick={triggerReport}
          disabled={loading}
          className={`bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
          }`}
        >
          {loading ? 'Gerando...' : 'Gerar Relatório Agora'}
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Período</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">PDF</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reports.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-12 text-gray-400">
                  Nenhum relatório ainda. Clique no botão acima para gerar o primeiro.
                </td>
              </tr>
            ) : reports.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">
                    {formatDate(r.semanaInicio)} – {formatDate(r.semanaFim)}
                  </div>
                  <div className="text-xs text-gray-400">
                    Enviado em: {r.enviadoEm ? formatDate(r.enviadoEm) : '—'}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    r.enviadoEm ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {r.enviadoEm ? 'Enviado' : 'Pendente'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  {r.pdfS3Url ? (
                    <a
                      href={`/api/reports/${r.id}/download`}
                      className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Baixar
                    </a>
                  ) : (
                    <span className="text-gray-400">Processando...</span>
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
