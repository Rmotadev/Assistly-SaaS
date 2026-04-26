'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export default function LoginPage() {
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
          <p className="text-gray-500 mt-2 text-sm">Entre na sua conta</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          {sent ? (
            <div className="text-center">
              <div className="text-4xl mb-4">📧</div>
              <h2 className="text-xl font-bold text-[#171e19] mb-2">Verifique seu e-mail</h2>
              <p className="text-gray-500 text-sm">
                Enviamos um link de acesso para <strong>{email}</strong>. Clique no link para entrar.
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
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

              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-[#171e19] text-white rounded-lg py-3 text-sm font-medium hover:bg-[#2a352b] transition-colors disabled:opacity-50"
              >
                {loading ? 'Enviando...' : 'Entrar com e-mail'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Não tem conta?{' '}
          <Link href="/register" className="text-[#171e19] font-medium underline">
            Criar conta grátis
          </Link>
        </p>
      </div>
    </div>
  )
}
