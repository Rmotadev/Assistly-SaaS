import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Assistly | Automação de Agentes de IA para Contadores",
  description: "Três agentes de IA que digitam suas notas fiscais, geram relatórios semanais e qualificam leads — enquanto você dorme.",
  openGraph: {
    title: "Assistly | Automação de Agentes de IA para Contadores",
    description: "Três agentes de IA que digitam suas notas fiscais, geram relatórios semanais e qualificam leads — enquanto você dorme.",
    images: ["/og-image.png"],
  },
}
import { PricingToggle } from '@/components/landing/PricingToggle'
import { FaqAccordion } from '@/components/landing/FaqAccordion'
import { DemoModal } from '@/components/landing/DemoModal'
import {
  FileText,
  BarChart3,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

export default function MarketingPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b-4 border-brutal-charcoal">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brutal-charcoal flex items-center justify-center brutal-shadow">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-brutal-yellow" />
              </div>
              <span className="font-display text-2xl sm:text-3xl text-brutal-charcoal">Assistly</span>
            </Link>
            <nav className="hidden md:flex gap-8">
              <Link href="#funcionalidades" className="font-bold text-brutal-charcoal/60 hover:text-brutal-charcoal brutal-transition">Funcionalidades</Link>
              <Link href="#precos" className="font-bold text-brutal-charcoal/60 hover:text-brutal-charcoal brutal-transition">Preços</Link>
              <Link href="#faq" className="font-bold text-brutal-charcoal/60 hover:text-brutal-charcoal brutal-transition">FAQ</Link>
            </nav>
            <Link
              href="/register"
              className="px-4 py-2 sm:px-6 sm:py-2.5 bg-brutal-yellow text-brutal-charcoal border-3 sm:border-4 border-brutal-charcoal font-bold text-sm sm:text-base brutal-shadow brutal-transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              Começar grátis
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-brutal-grid-light pt-28 pb-20 sm:pt-40 sm:pb-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-block bg-brutal-charcoal text-white px-3 py-1 sm:px-4 sm:py-1.5 font-bold text-xs sm:text-sm uppercase tracking-widest mb-8 sm:mb-10">
              Agentes de IA para Contadores
            </div>
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-brutal-charcoal leading-[0.85] mb-6 sm:mb-8">
              Automatize o{' '}
              <span className="relative inline-block">
                <span className="relative z-10">trabalho</span>
                <span className="absolute -inset-1 sm:-inset-2 bg-brutal-yellow -rotate-2 -z-0" />
              </span>{' '}
              repetitivo.
            </h1>
            <p className="text-base sm:text-xl md:text-2xl font-medium text-brutal-charcoal/60 mb-10 sm:mb-12 max-w-2xl mx-auto">
              3 agentes de IA que digitam suas notas fiscais, geram relatórios semanais e qualificam leads — enquanto você dorme.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12 sm:mb-16">
              <Link
                href="/register"
                className="flex items-center gap-2 w-full sm:w-auto justify-center px-8 py-4 sm:px-10 sm:py-5 bg-brutal-charcoal text-white font-bold text-base sm:text-lg border-4 border-brutal-charcoal shadow-[6px_6px_0px_0px_rgba(255,225,124,1)] sm:shadow-[8px_8px_0px_0px_rgba(255,225,124,1)] brutal-transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(255,225,124,1)]"
              >
                Começar 14 dias grátis
                <ArrowRight className="w-5 h-5" />
              </Link>
              <DemoModal />
            </div>
            <p className="font-bold text-sm sm:text-base text-brutal-charcoal/40">
              Usado por <span className="text-brutal-charcoal/70">+200</span> escritórios contábeis
            </p>
          </div>
        </section>

        {/* Problema */}
        <section className="py-16 sm:py-28 bg-brutal-charcoal text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display text-4xl sm:text-6xl md:text-8xl leading-[0.85] mb-10 sm:mb-16">
              Quanto tempo você <span className="text-brutal-yellow">perde</span> todo mês?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[
                { icon: FileText, title: 'Digitação de NFs', stat: '40h/mês', desc: 'desperdiçadas em transcrição' },
                { icon: BarChart3, title: 'Relatórios manuais', stat: '3h/sexta', desc: 'montando planilhas' },
                { icon: MessageCircle, title: 'Leads perdidos', stat: '67%', desc: 'sem resposta fora do horário' },
              ].map((item, i) => (
                <div key={i} className="border-4 border-white/10 p-6 sm:p-8 text-center brutal-transition hover:bg-white/5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-brutal-yellow border-4 border-brutal-charcoal flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-brutal-charcoal" />
                  </div>
                  <p className="font-display text-4xl sm:text-6xl text-brutal-yellow mb-2 sm:mb-3">{item.stat}</p>
                  <p className="font-bold text-base sm:text-lg uppercase mb-1">{item.title}</p>
                  <p className="text-brutal-sage text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Funcionalidades */}
        <section id="funcionalidades" className="py-16 sm:py-28 bg-brutal-grid-light">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display text-4xl sm:text-7xl md:text-8xl lg:text-9xl text-brutal-charcoal leading-[0.85] mb-4 sm:mb-6">
              Três agentes.{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Zero trabalho.</span>
                <span className="absolute left-0 bottom-1 sm:bottom-2 w-full h-2 sm:h-4 bg-brutal-yellow -z-0" />
              </span>
            </h2>
            <p className="text-base sm:text-lg text-brutal-charcoal/50 font-medium mb-12 sm:mb-20 max-w-xl mx-auto">
              Treinados especificamente para o fluxo contábil brasileiro.
            </p>

            <div className="space-y-8 text-left">
              {/* Agente NF */}
              <div className="bg-white border-4 border-brutal-charcoal p-5 sm:p-10 brutal-shadow">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="w-16 h-16 bg-brutal-yellow border-4 border-brutal-charcoal flex items-center justify-center mb-8 brutal-shadow">
                      <FileText className="w-8 h-8 text-brutal-charcoal" />
                    </div>
                    <h3 className="font-display text-3xl sm:text-5xl mb-4">Agente NF</h3>
                    <p className="text-brutal-charcoal/50 font-medium mb-8">Extração, classificação e exportação automática de notas fiscais.</p>
                    <ul className="space-y-4">
                      {['Recebe XML da NF-e', 'Extrai campos automaticamente', 'Classifica por tipo', 'Exporta para Domínio/TOTVS/ContaAzul'].map(f => (
                        <li key={f} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-brutal-charcoal shrink-0" />
                          <span className="font-bold">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-brutal-charcoal border-4 border-brutal-charcoal p-8 text-white shadow-[8px_8px_0px_0px_rgba(255,225,124,1)]">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-white/10">
                      <span className="font-bold text-xs uppercase tracking-widest text-brutal-sage">NF-E Extractor</span>
                      <span className="bg-brutal-yellow text-brutal-charcoal px-2 py-0.5 text-xs font-bold">READY</span>
                    </div>
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between border-b border-white/5 pb-3"><span className="opacity-40">Número</span><span className="font-mono font-bold">004.281.992</span></div>
                      <div className="flex justify-between border-b border-white/5 pb-3"><span className="opacity-40">Valor</span><span className="font-bold text-brutal-yellow">R$ 14.500,00</span></div>
                      <div className="flex justify-between border-b border-white/5 pb-3"><span className="opacity-40">CNPJ</span><span className="font-mono text-xs">45.291.000/0001-92</span></div>
                      <div className="flex justify-between"><span className="opacity-40">Impostos</span><span className="font-bold">PIS, COFINS, ISS</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agente Relatório */}
              <div className="bg-white border-4 border-brutal-charcoal p-5 sm:p-10 brutal-shadow">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="order-2 md:order-1 bg-brutal-yellow border-4 border-brutal-charcoal p-8 shadow-[8px_8px_0px_0px_rgba(23,30,25,1)]">
                    <div className="font-display text-3xl text-brutal-charcoal mb-6 pb-4 border-b-4 border-brutal-charcoal">Resumo Semanal</div>
                    <div className="space-y-5">
                      <div>
                        <div className="flex justify-between text-sm font-bold mb-1"><span>Entradas</span><span>R$ 45.200</span></div>
                        <div className="w-full bg-brutal-charcoal/10 h-3"><div className="bg-brutal-charcoal h-3" style={{ width: '75%' }} /></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm font-bold mb-1"><span>Saídas</span><span>R$ 12.400</span></div>
                        <div className="w-full bg-brutal-charcoal/10 h-3"><div className="bg-brutal-charcoal h-3" style={{ width: '25%' }} /></div>
                      </div>
                      <div className="mt-4 bg-white border-4 border-brutal-charcoal p-4">
                        <p className="font-bold text-sm">⚠️ 2 notas duplicadas detectadas (R$ 1.500)</p>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 md:order-2">
                    <div className="w-16 h-16 bg-brutal-charcoal border-4 border-brutal-charcoal flex items-center justify-center mb-8 shadow-[4px_4px_0px_0px_rgba(255,225,124,1)] text-brutal-yellow">
                      <BarChart3 className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-3xl sm:text-5xl mb-4">Agente Relatório</h3>
                    <p className="text-brutal-charcoal/50 font-medium mb-8">Relatório financeiro automático toda sexta-feira às 17h.</p>
                    <ul className="space-y-4">
                      {['Envio automático toda sexta', 'Análise inteligente por IA', 'Detecta NFs duplicadas', 'PDF direto no e-mail'].map(f => (
                        <li key={f} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-brutal-charcoal shrink-0" />
                          <span className="font-bold">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Agente Leads */}
              <div className="bg-white border-4 border-brutal-charcoal p-10 brutal-shadow">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="w-16 h-16 bg-brutal-yellow border-4 border-brutal-charcoal flex items-center justify-center mb-8 brutal-shadow">
                      <MessageCircle className="w-8 h-8 text-brutal-charcoal" />
                    </div>
                    <h3 className="font-display text-3xl sm:text-5xl mb-4">Agente Leads</h3>
                    <p className="text-brutal-charcoal/50 font-medium mb-8">Resposta e qualificação 24/7 via WhatsApp e Instagram.</p>
                    <ul className="space-y-4">
                      {['Responde fora do expediente', 'Qualifica serviço e urgência', 'Agenda retorno humano', 'Notifica em tempo real'].map(f => (
                        <li key={f} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-brutal-charcoal shrink-0" />
                          <span className="font-bold">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-brutal-charcoal border-4 border-brutal-charcoal p-6 text-white shadow-[8px_8px_0px_0px_rgba(183,198,194,0.3)]">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-white/10">
                      <div className="w-10 h-10 bg-green-600 flex items-center justify-center"><MessageCircle className="w-5 h-5 text-white" /></div>
                      <div><p className="font-bold text-sm">Carlos (MEI)</p><p className="text-xs text-brutal-sage">Sábado, 14:30</p></div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="bg-white/5 p-3 max-w-[80%]">Olá, queria abrir um CNPJ MEI, vocês fazem isso?</div>
                      <div className="bg-brutal-yellow/20 p-3 max-w-[80%] ml-auto">Olá Carlos! Sim, realizamos a abertura de MEI. Qual é a sua área de atuação?</div>
                      <div className="bg-brutal-yellow text-brutal-charcoal p-3 border-4 border-brutal-charcoal mt-2">
                        <p className="font-bold text-xs uppercase tracking-wider mb-1">Qualificação Automática</p>
                        <p className="text-xs">Serviço: MEI · Urgência: Alta · Retorno: Seg 09h</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="py-16 sm:py-28 bg-white border-y-4 border-brutal-charcoal/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display text-4xl sm:text-6xl md:text-8xl text-brutal-charcoal leading-[0.85] mb-12 sm:mb-20">
              Pronto em <span className="text-brutal-yellow">30 minutos</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { n: '01', t: 'Conecte', d: 'Integre seu sistema contábil atual.' },
                { n: '02', t: 'Configure', d: 'Defina horários e canais de atendimento.' },
                { n: '03', t: 'Automatize', d: 'Os agentes assumem o trabalho pesado.' },
              ].map((step, i) => (
                <div key={i} className="group">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brutal-yellow border-4 border-brutal-charcoal flex items-center justify-center font-display text-3xl sm:text-5xl text-brutal-charcoal mx-auto mb-6 brutal-shadow group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 brutal-transition">
                    {step.n}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl mb-3">{step.t}</h3>
                  <p className="text-brutal-charcoal/50 font-medium">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrações */}
        <section className="py-16 bg-white border-b-4 border-brutal-charcoal/10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="font-bold text-brutal-charcoal/30 uppercase tracking-widest text-sm mb-8">Funciona com os sistemas que você já usa</p>
            <div className="flex flex-wrap justify-center gap-8">
              {['Domínio', 'TOTVS', 'ContaAzul', 'WhatsApp', 'Instagram'].map(b => (
                <span key={b} className="font-display text-xl sm:text-3xl text-brutal-charcoal/20">{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Preços */}
        <section id="precos" className="py-16 sm:py-28 bg-brutal-grid-light">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-brutal-charcoal leading-[0.85] mb-4 sm:mb-6">
              Planos{' '}
              <span className="relative inline-block">
                <span className="relative z-10">simples.</span>
                <span className="absolute -inset-1 sm:-inset-2 bg-brutal-yellow -rotate-1 -z-0" />
              </span>
            </h2>
            <p className="text-base sm:text-lg text-brutal-charcoal/50 font-medium mb-12 sm:mb-20">
              Escolha o plano ideal para seu escritório.
            </p>
            <PricingToggle />
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-16 sm:py-28 bg-brutal-charcoal text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display text-4xl sm:text-6xl md:text-8xl leading-[0.85] mb-12 sm:mb-20">
              O que <span className="text-brutal-yellow">contadores</span> dizem
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[
                { n: 'Maria Souza', c: 'Sócia, São Paulo', d: '"O Agente NF reduziu nosso trabalho manual em 90%. O ROI veio na primeira semana."' },
                { n: 'Carlos Lima', c: 'Contador, Porto Alegre', d: '"O relatório semanal automático diferencia meu escritório. Zero Excel agora."' },
                { n: 'Ana Ferreira', c: 'Gerente, Belo Horizonte', d: '"Não perdemos mais leads no fim de semana. A qualificação da IA é precisa."' },
              ].map((t, i) => (
                <div key={i} className="border-4 border-white/10 p-8 text-left brutal-transition hover:bg-white/5">
                  <p className="font-medium leading-relaxed mb-8 opacity-80">{t.d}</p>
                  <div>
                    <p className="font-bold text-brutal-yellow">{t.n}</p>
                    <p className="text-sm text-brutal-sage">{t.c}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 sm:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-16">
            <h2 className="font-display text-4xl sm:text-6xl md:text-8xl text-brutal-charcoal leading-[0.85]">
              Perguntas <span className="text-brutal-sage">frequentes</span>
            </h2>
          </div>
          <FaqAccordion />
        </section>

        {/* CTA Final */}
        <section className="py-16 sm:py-28 bg-brutal-yellow text-brutal-charcoal border-y-4 border-brutal-charcoal text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.85] mb-6 sm:mb-8">
              Comece a automatizar hoje
            </h2>
            <p className="text-base sm:text-xl font-bold opacity-60 mb-8 sm:mb-12">
              14 dias grátis. Sem cartão. Configuração em 30 minutos.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 w-full sm:w-auto justify-center px-8 py-4 sm:px-12 sm:py-6 bg-brutal-charcoal text-white font-bold text-base sm:text-xl border-4 border-brutal-charcoal shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] sm:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] brutal-transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              Criar minha conta grátis
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brutal-charcoal py-16 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brutal-yellow flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-brutal-charcoal" />
              </div>
              <span className="font-display text-2xl">Assistly</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-bold text-brutal-sage">
              <Link href="#funcionalidades" className="hover:text-brutal-yellow brutal-transition">Funcionalidades</Link>
              <Link href="#precos" className="hover:text-brutal-yellow brutal-transition">Preços</Link>
              <Link href="#faq" className="hover:text-brutal-yellow brutal-transition">FAQ</Link>
              <Link href="#" className="hover:text-brutal-yellow brutal-transition">Privacidade</Link>
              <Link href="#" className="hover:text-brutal-yellow brutal-transition">Termos</Link>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-sm text-brutal-sage/50">© 2026 Assistly. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
