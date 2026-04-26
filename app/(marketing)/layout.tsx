import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Assistly - Agentes de IA para Escritórios Contábeis',
  description: 'Automatize a digitação de notas fiscais, geração de relatórios e atendimento de leads com inteligência artificial.',
  openGraph: {
    title: 'Assistly - Inteligência Artificial para Contabilidade',
    description: 'Agentes de IA que digitam suas notas fiscais, geram relatórios semanais e respondem seus leads — enquanto você dorme.',
    type: 'website',
  },
  // og:title fallback for script
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen font-sans selection:bg-brutal-yellow selection:text-brutal-charcoal">
      {children}
    </div>
  )
}
