'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function OnboardingWizard({ plano }: { plano: string }) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    sistema: '',
    horarioInicio: '09:00',
    horarioFim: '18:00',
  })

  const handleNext = async (stepData: Record<string, unknown>) => {
    setLoading(true)
    try {
      await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step, data: stepData }),
      })
      if (step === 5) {
        router.push('/dashboard')
        router.refresh()
      } else {
        setStep((s) => s + 1)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200 mt-10">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className={`w-1/5 h-2 rounded-full mx-1 ${s <= step ? 'bg-blue-600' : 'bg-gray-200'}`} />
          ))}
        </div>
        <p className="text-sm text-gray-500 text-center">Passo {step} de 5</p>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Dados do Escritório</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input className="w-full border rounded-lg p-2" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CNPJ</label>
            <input className="w-full border rounded-lg p-2" value={formData.cnpj} onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })} />
          </div>
          <button disabled={loading || !formData.nome} onClick={() => handleNext({ nome: formData.nome, cnpj: formData.cnpj })} className="w-full bg-blue-600 text-white rounded-lg p-2 mt-4 disabled:opacity-50">Próximo</button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Sistema Contábil</h2>
          <select className="w-full border rounded-lg p-2" value={formData.sistema} onChange={(e) => setFormData({ ...formData, sistema: e.target.value })}>
            <option value="">Selecione...</option>
            <option value="DOMINIO">Domínio</option>
            <option value="TOTVS">TOTVS</option>
            <option value="CONTAAZUL">Conta Azul</option>
          </select>
          <div className="flex gap-2 mt-4">
            <button onClick={() => handleNext({})} className="flex-1 border rounded-lg p-2">Pular</button>
            <button disabled={loading || !formData.sistema} onClick={() => handleNext({ sistema: formData.sistema })} className="flex-1 bg-blue-600 text-white rounded-lg p-2 disabled:opacity-50">Próximo</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Canais de Atendimento</h2>
          {plano === 'ESSENCIAL' && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">Deseja automatizar leads no WhatsApp e Instagram? Faça upgrade para o Plano Completo!</p>
            </div>
          )}
          <button onClick={() => handleNext({})} className="w-full bg-blue-600 text-white rounded-lg p-2 mt-4">Próximo</button>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Horário de Expediente</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Início</label>
              <input type="time" className="w-full border rounded-lg p-2" value={formData.horarioInicio} onChange={(e) => setFormData({ ...formData, horarioInicio: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fim</label>
              <input type="time" className="w-full border rounded-lg p-2" value={formData.horarioFim} onChange={(e) => setFormData({ ...formData, horarioFim: e.target.value })} />
            </div>
          </div>
          <button disabled={loading} onClick={() => handleNext({ horarioInicio: formData.horarioInicio, horarioFim: formData.horarioFim })} className="w-full bg-blue-600 text-white rounded-lg p-2 mt-4 disabled:opacity-50">Próximo</button>
        </div>
      )}

      {step === 5 && (
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tudo Pronto!</h2>
          <p className="text-gray-600">O Assistly está configurado e pronto para uso.</p>
          <button disabled={loading} onClick={() => handleNext({})} className="w-full bg-blue-600 text-white rounded-lg p-3 font-semibold mt-6 disabled:opacity-50">Concluir e ir para o Dashboard</button>
        </div>
      )}
    </div>
  )
}
