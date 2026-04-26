'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError('')

    const res = await signIn('email', {
      email,
      redirect: false,
      callbackUrl: '/dashboard',
    })

    setLoading(false)
    if (res?.error) {
      setError('Erro ao enviar e-mail. Tente novamente.')
    } else {
      setSent(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-[#171e19]">
            ✦ Assistly
          </Link>
          <p className="text-gray-500 mt-2 text-sm">Crie sua conta grátis — 14 dias sem cartão</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          {sent ? (
            <div className="text-center">
              <div className="text-4xl mb-4">📧</div>
              <h2 className="text-xl font-bold text-[#171e19] mb-2">Verifique seu e-mail</h2>
              <p className="text-gray-500 text-sm">
                Enviamos um link de acesso para <strong>{email}</strong>. Clique no link para criar sua conta e entrar.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 text-sm text-gray-400 hover:text-gray-600 underline"
              >
                Usar outro e-mail
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-[#171e19] mb-4">Criar conta</h2>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail do escritório
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@escritorio.com.br"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#171e19]"
                />
              </div>

              <p className="text-xs text-gray-400">
                Vamos enviar um link mágico para seu e-mail. Sem senha necessária.
              </p>

              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-[#171e19] text-white rounded-lg py-3 text-sm font-medium hover:bg-[#2a352b] transition-colors disabled:opacity-50"
              >
                {loading ? 'Enviando...' : 'Criar conta grátis'}
              </button>

              <p className="text-xs text-center text-gray-400">
                Ao continuar, você concorda com nossos termos de uso.
              </p>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Já tem conta?{' '}
          <Link href="/login" className="text-[#171e19] font-medium underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}
