'use client'
import { useState } from 'react'
import { Lead, StatusLead } from '@prisma/client'
import { LeadMessage, LeadQualification } from '@/types/leads'

const STATUS_CONFIG = {
  NOVO: { label: 'Novo', color: 'bg-blue-100 text-blue-800' },
  QUALIFICADO: { label: 'Qualificado', color: 'bg-yellow-100 text-yellow-800' },
  AGENDADO: { label: 'Agendado', color: 'bg-green-100 text-green-800' },
  PERDIDO: { label: 'Perdido', color: 'bg-gray-100 text-gray-600' },
}

const CANAL_CONFIG = {
  WHATSAPP: { label: 'WhatsApp', color: 'bg-green-100 text-green-800' },
  INSTAGRAM: { label: 'Instagram', color: 'bg-teal-100 text-teal-800' },
}

export function LeadsClient({ leads: initialLeads }: { leads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [updating, setUpdating] = useState(false)

  async function updateStatus(leadId: string, status: string) {
    setUpdating(true)
    const res = await fetch(`/api/leads/${leadId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (res.ok) {
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: status as StatusLead } : l))
      if (selectedLead?.id === leadId) setSelectedLead((prev) => prev ? ({ ...prev, status: status as StatusLead }) : null)
    }
    setUpdating(false)
  }

  function formatDate(d: Date | string) {
    return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
  }

  const qualificacao = selectedLead?.qualificacaoJson as unknown as LeadQualification

  return (
    <div className="flex gap-6 h-full">
      {/* Lista de leads */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <span className="text-sm text-gray-500">{leads.length} leads</span>
        </div>

        <div className="space-y-2">
          {leads.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
              Nenhum lead ainda. Configure WhatsApp e Instagram nas Configurações.
            </div>
          ) : leads.map(lead => (
            <div
              key={lead.id}
              onClick={() => setSelectedLead(lead)}
              className={`bg-white rounded-xl border p-4 cursor-pointer transition-colors ${
                selectedLead?.id === lead.id ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${CANAL_CONFIG[lead.canal as keyof typeof CANAL_CONFIG]?.color}`}>
                    {CANAL_CONFIG[lead.canal as keyof typeof CANAL_CONFIG]?.label}
                  </span>
                  <span className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                    {lead.contato.replace('whatsapp:', '')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_CONFIG[lead.status as keyof typeof STATUS_CONFIG]?.color}`}>
                    {STATUS_CONFIG[lead.status as keyof typeof STATUS_CONFIG]?.label}
                  </span>
                  <span className="text-xs text-gray-400">{formatDate(lead.criadoEm)}</span>
                </div>
              </div>
              {(lead.mensagensJson as unknown as LeadMessage[]).length > 0 && (
                <p className="text-xs text-gray-500 mt-2 truncate">
                  {(lead.mensagensJson as unknown as LeadMessage[]).at(-1)?.content}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Painel de detalhes */}
      {selectedLead && (
        <div className="w-80 bg-white rounded-xl border border-gray-200 p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Detalhes do Lead</h2>
            <button onClick={() => setSelectedLead(null)} className="text-gray-400 hover:text-gray-600 text-lg">×</button>
          </div>

          <div className="space-y-3 text-sm flex-1">
            <div>
              <p className="text-gray-500 text-xs">Contato</p>
              <p className="font-medium">{selectedLead.contato.replace('whatsapp:', '')}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Canal</p>
              <p>{CANAL_CONFIG[selectedLead.canal as keyof typeof CANAL_CONFIG]?.label}</p>
            </div>
            {qualificacao?.servicoInteresse && (
              <div>
                <p className="text-gray-500 text-xs">Serviço de interesse</p>
                <p>{qualificacao.servicoInteresse}</p>
              </div>
            )}
            {qualificacao?.porteEmpresa && (
              <div>
                <p className="text-gray-500 text-xs">Porte</p>
                <p>{qualificacao.porteEmpresa}</p>
              </div>
            )}
            {qualificacao?.urgencia && (
              <div>
                <p className="text-gray-500 text-xs">Urgência</p>
                <p className="capitalize">{qualificacao.urgencia}</p>
              </div>
            )}
            {qualificacao?.resumo && (
              <div>
                <p className="text-gray-500 text-xs">Resumo</p>
                <p className="text-gray-700">{qualificacao.resumo}</p>
              </div>
            )}
          </div>

          {/* Histórico */}
          <div className="mt-4 border-t pt-4">
            <p className="text-xs text-gray-500 mb-2">Histórico ({(selectedLead.mensagensJson as unknown as LeadMessage[]).length} mensagens)</p>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {(selectedLead.mensagensJson as unknown as LeadMessage[]).map((m, i) => (
                <div key={i} className={`text-xs p-2 rounded ${m.role === 'user' ? 'bg-gray-100' : 'bg-blue-50'}`}>
                  <span className="font-medium">{m.role === 'user' ? 'Lead' : 'Bot'}:</span> {m.content}
                </div>
              ))}
            </div>
          </div>

          {/* Atualizar status */}
          <div className="mt-4 border-t pt-4">
            <p className="text-xs text-gray-500 mb-2">Atualizar status</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(STATUS_CONFIG).map(([status, config]) => (
                <button
                  key={status}
                  onClick={() => updateStatus(selectedLead.id, status)}
                  disabled={updating || selectedLead.status === status}
                  className={`text-xs px-2 py-1.5 rounded-lg border transition-colors disabled:opacity-50 ${
                    selectedLead.status === status
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {config.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
