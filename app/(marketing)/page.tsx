import { Metadata } from 'next'
import Link from 'next/link'
import { FaqAccordion } from '@/components/landing/FaqAccordion'
import { DemoModal } from '@/components/landing/DemoModal'
import { Reveal, Stagger, StaggerItem } from '@/components/landing/Reveal'
import { HeroFadeUp, HighlightSweep } from '@/components/landing/HeroAnimated'
import {
  FileText,
  BarChart3,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

export const metadata: Metadata = {
  title: "Assistly | Três agentes de IA para escritórios contábeis",
  description: "Digitação de NF, relatório semanal e atendimento no WhatsApp — feito por IA e entregue direto no Domínio, TOTVS ou ContaAzul.",
  openGraph: {
    title: "Assistly | Três agentes de IA para escritórios contábeis",
    description: "Digitação de NF, relatório semanal e atendimento no WhatsApp — feito por IA e entregue direto no Domínio, TOTVS ou ContaAzul.",
    images: ["/og-image.png"],
  },
}

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
              <Link href="#piloto" className="font-bold text-brutal-charcoal/60 hover:text-brutal-charcoal brutal-transition">Piloto</Link>
              <Link href="#faq" className="font-bold text-brutal-charcoal/60 hover:text-brutal-charcoal brutal-transition">FAQ</Link>
            </nav>
            <a
              href="https://wa.me/5551982759010?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20programa%20piloto%20do%20Assistly"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 sm:px-6 sm:py-2.5 bg-brutal-yellow text-brutal-charcoal border-3 sm:border-4 border-brutal-charcoal font-bold text-sm sm:text-base brutal-shadow brutal-transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none whitespace-nowrap"
            >
              <span className="sm:hidden">Piloto</span>
              <span className="hidden sm:inline">Participar do piloto</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-brutal-grid-light pt-28 pb-20 sm:pt-40 sm:pb-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <HeroFadeUp delay={0}>
              <div className="inline-block bg-brutal-charcoal text-white px-3 py-1 sm:px-4 sm:py-1.5 font-bold text-xs sm:text-sm uppercase tracking-widest mb-8 sm:mb-10">
                Agentes de IA para escritórios contábeis
              </div>
            </HeroFadeUp>
            <HeroFadeUp delay={0.1}>
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-brutal-charcoal leading-[0.85] mb-6 sm:mb-8">
                Devolva{' '}
                <HighlightSweep>40 horas</HighlightSweep>{' '}
                por mês pra sua equipe.
              </h1>
            </HeroFadeUp>
            <HeroFadeUp delay={0.25}>
              <p className="text-base sm:text-xl md:text-2xl font-medium text-brutal-charcoal/60 mb-10 sm:mb-12 max-w-2xl mx-auto">
                Três agentes de IA cuidam da digitação de NFs, do relatório semanal e do atendimento no WhatsApp — integrados ao Domínio, TOTVS ou ContaAzul.
              </p>
            </HeroFadeUp>
            <HeroFadeUp delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12 sm:mb-16">
                <a
                  href="https://wa.me/5551982759010?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20programa%20piloto%20do%20Assistly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full sm:w-auto justify-center px-8 py-4 sm:px-10 sm:py-5 bg-brutal-charcoal text-white font-bold text-base sm:text-lg border-4 border-brutal-charcoal shadow-[6px_6px_0px_0px_rgba(255,225,124,1)] sm:shadow-[8px_8px_0px_0px_rgba(255,225,124,1)] brutal-transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(255,225,124,1)]"
                >
                  Quero participar do piloto
                  <ArrowRight className="w-5 h-5" />
                </a>
                <DemoModal />
              </div>
            </HeroFadeUp>
            <HeroFadeUp delay={0.55}>
              <p className="font-bold text-sm sm:text-base text-brutal-charcoal/40">
                Programa piloto · 10 escritórios por vez
              </p>
            </HeroFadeUp>
          </div>
        </section>

        {/* Problema */}
        <section className="py-16 sm:py-28 bg-brutal-charcoal text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <Reveal>
              <h2 className="font-display text-4xl sm:text-6xl md:text-8xl leading-[0.85] mb-10 sm:mb-16">
                Quanto tempo você <span className="text-brutal-yellow">perde</span> todo mês?
              </h2>
            </Reveal>
            <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[
                { icon: FileText, title: 'Digitação de NF', stat: '40h/mês', desc: 'transcrevendo XML no ERP' },
                { icon: BarChart3, title: 'Relatório manual', stat: '3h/sexta', desc: 'montando planilha pro cliente' },
                { icon: MessageCircle, title: 'Leads sem resposta', stat: '67%', desc: 'chegam fora do horário comercial' },
              ].map((item, i) => (
                <StaggerItem key={i} className="border-4 border-white/10 p-6 sm:p-8 text-center brutal-transition hover:bg-white/5 hover:-translate-y-1">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-brutal-yellow border-4 border-brutal-charcoal flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-brutal-charcoal" />
                  </div>
                  <p className="font-display text-4xl sm:text-6xl text-brutal-yellow mb-2 sm:mb-3">{item.stat}</p>
                  <p className="font-bold text-base sm:text-lg uppercase mb-1">{item.title}</p>
                  <p className="text-brutal-sage text-sm">{item.desc}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Funcionalidades */}
        <section id="funcionalidades" className="scroll-mt-20 py-16 sm:py-28 bg-brutal-grid-light">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display text-4xl sm:text-7xl md:text-8xl lg:text-9xl text-brutal-charcoal leading-[0.85] mb-4 sm:mb-6">
              Três agentes.{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Um resultado.</span>
                <span className="absolute left-0 bottom-1 sm:bottom-2 w-full h-2 sm:h-4 bg-brutal-yellow -z-0" />
              </span>
            </h2>
            <p className="text-base sm:text-lg text-brutal-charcoal/50 font-medium mb-12 sm:mb-20 max-w-xl mx-auto">
              Cada um faz uma coisa — bem. Treinados no fluxo contábil brasileiro.
            </p>

            <div className="space-y-8 text-left">
              {/* Agente NF */}
              <Reveal className="bg-white border-4 border-brutal-charcoal p-5 sm:p-10 brutal-shadow">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="w-16 h-16 bg-brutal-yellow border-4 border-brutal-charcoal flex items-center justify-center mb-8 brutal-shadow">
                      <FileText className="w-8 h-8 text-brutal-charcoal" />
                    </div>
                    <h3 className="font-display text-3xl sm:text-5xl mb-4">Agente NF</h3>
                    <p className="text-brutal-charcoal/50 font-medium mb-8">Recebe o XML, extrai os dados, classifica e joga direto no seu ERP. Sem digitação.</p>
                    <ul className="space-y-4">
                      {['Lê XML da NF-e em segundos', 'Extrai todos os campos fiscais', 'Classifica por CFOP e tipo', 'Exporta pro Domínio, TOTVS ou ContaAzul'].map(f => (
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
              </Reveal>

              {/* Agente Relatório */}
              <Reveal delay={0.1} className="bg-white border-4 border-brutal-charcoal p-5 sm:p-10 brutal-shadow">
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
                    <p className="text-brutal-charcoal/50 font-medium mb-8">Toda sexta às 17h, um PDF com entradas, saídas e alertas — no e-mail do cliente e no seu.</p>
                    <ul className="space-y-4">
                      {['Envio automático toda sexta', 'Compara com a semana anterior', 'Sinaliza NFs duplicadas ou fora do padrão', 'PDF pronto pra enviar ao cliente'].map(f => (
                        <li key={f} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-brutal-charcoal shrink-0" />
                          <span className="font-bold">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>

              {/* Agente Leads */}
              <Reveal delay={0.15} className="bg-white border-4 border-brutal-charcoal p-5 sm:p-10 brutal-shadow">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="w-16 h-16 bg-brutal-yellow border-4 border-brutal-charcoal flex items-center justify-center mb-8 brutal-shadow">
                      <MessageCircle className="w-8 h-8 text-brutal-charcoal" />
                    </div>
                    <h3 className="font-display text-3xl sm:text-5xl mb-4">Agente Leads</h3>
                    <p className="text-brutal-charcoal/50 font-medium mb-8">Responde no WhatsApp e Instagram 24/7, qualifica o lead e agenda o seu retorno na segunda de manhã.</p>
                    <ul className="space-y-4">
                      {['Atende fora do horário e no fim de semana', 'Identifica serviço, urgência e regime tributário', 'Marca o retorno humano na sua agenda', 'Te avisa quando o lead é quente'].map(f => (
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
              </Reveal>
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="py-16 sm:py-28 bg-white border-y-4 border-brutal-charcoal/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <Reveal>
              <h2 className="font-display text-4xl sm:text-6xl md:text-8xl text-brutal-charcoal leading-[0.85] mb-12 sm:mb-20">
                Pronto em <span className="text-brutal-yellow">30 minutos</span>
              </h2>
            </Reveal>
            <Stagger className="grid md:grid-cols-3 gap-12">
              {[
                { n: '01', t: 'Conecte', d: 'Plugue seu ERP e canais de atendimento.' },
                { n: '02', t: 'Configure', d: 'Escolha horários, regras e tom de voz.' },
                { n: '03', t: 'Automatize', d: 'Os agentes trabalham. Você acompanha.' },
              ].map((step, i) => (
                <StaggerItem key={i} className="group">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brutal-yellow border-4 border-brutal-charcoal flex items-center justify-center font-display text-3xl sm:text-5xl text-brutal-charcoal mx-auto mb-6 brutal-shadow group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 brutal-transition">
                    {step.n}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl mb-3">{step.t}</h3>
                  <p className="text-brutal-charcoal/50 font-medium">{step.d}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Integrações */}
        <section className="py-16 bg-white border-b-4 border-brutal-charcoal/10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="font-bold text-brutal-charcoal/30 uppercase tracking-widest text-sm mb-8">Já conversa com as ferramentas do seu dia a dia</p>
            <div className="flex flex-wrap justify-center gap-8">
              {['Domínio', 'TOTVS', 'ContaAzul', 'WhatsApp', 'Instagram'].map(b => (
                <span key={b} className="font-display text-xl sm:text-3xl text-brutal-charcoal/20">{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Programa Piloto */}
        <section id="piloto" className="scroll-mt-20 py-16 sm:py-28 bg-brutal-grid-light">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-brutal-charcoal leading-[0.85] mb-4 sm:mb-6">
              Programa{' '}
              <span className="relative inline-block">
                <span className="relative z-10">piloto.</span>
                <span className="absolute -inset-1 sm:-inset-2 bg-brutal-yellow -rotate-1 -z-0" />
              </span>
            </h2>
            <p className="text-base sm:text-lg text-brutal-charcoal/50 font-medium mb-12 sm:mb-20 max-w-2xl mx-auto">
              10 escritórios por vez. Você usa 30 dias por conta da casa — a gente aprende com o seu fluxo e melhora o produto junto.
            </p>
            <Reveal className="max-w-2xl mx-auto bg-white border-4 border-brutal-charcoal p-6 sm:p-10 text-left brutal-shadow">
              <h3 className="font-display text-2xl sm:text-4xl text-brutal-charcoal mb-6">O que está incluso</h3>
              <ul className="space-y-4 mb-8">
                {[
                  '30 dias grátis — sem cartão de crédito',
                  'Os 3 agentes ativos desde o dia 1',
                  'Configuração feita pela nossa equipe',
                  'Linha direta com o fundador no WhatsApp',
                  'Cancela quando quiser, sem burocracia',
                  'Preço travado se decidir continuar',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brutal-charcoal shrink-0" />
                    <span className="font-bold text-brutal-charcoal">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/5551982759010?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20programa%20piloto%20do%20Assistly"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-8 py-4 bg-brutal-yellow text-brutal-charcoal border-4 border-brutal-charcoal font-bold text-base sm:text-lg brutal-shadow brutal-transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none text-center"
              >
                Quero participar do piloto
                <ArrowRight className="w-5 h-5" />
              </a>
            </Reveal>
          </div>
        </section>

        {/* Por que entrar agora */}
        <section className="py-16 sm:py-28 bg-brutal-charcoal text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display text-4xl sm:text-6xl md:text-8xl leading-[0.85] mb-12 sm:mb-20">
              Por que <span className="text-brutal-yellow">entrar agora</span>
            </h2>
            <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[
                { title: 'Grátis', subtitle: 'Sem risco', desc: '30 dias completos. Sem cartão, sem pegadinha, cancela num clique.' },
                { title: 'Prioridade', subtitle: 'Acesso direto', desc: 'Fala com quem constrói. Sua opinião entra no roadmap na mesma semana.' },
                { title: 'Exclusivo', subtitle: 'Preço travado', desc: 'Quem entra no piloto congela o preço quando os planos comerciais lançarem.' },
              ].map((card, i) => (
                <StaggerItem key={i} className="border-4 border-white/10 p-8 text-left brutal-transition hover:bg-white/5 hover:-translate-y-1">
                  <p className="font-bold text-brutal-yellow text-xl mb-1">{card.title}</p>
                  <p className="text-sm text-brutal-sage mb-6">{card.subtitle}</p>
                  <p className="font-medium leading-relaxed opacity-80">{card.desc}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-20 py-16 sm:py-28 bg-white">
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
              Semana que vem já pode ser diferente.
            </h2>
            <p className="text-base sm:text-xl font-bold opacity-60 mb-8 sm:mb-12">
              30 dias grátis. Setup em 30 minutos. Só 10 vagas por vez.
            </p>
            <a
              href="https://wa.me/5551982759010?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20programa%20piloto%20do%20Assistly"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 w-full sm:w-auto justify-center px-8 py-4 sm:px-12 sm:py-6 bg-brutal-charcoal text-white font-bold text-base sm:text-xl border-4 border-brutal-charcoal shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] sm:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] brutal-transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              Quero participar do piloto
              <ArrowRight className="w-5 h-5" />
            </a>
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
              <Link href="#piloto" className="hover:text-brutal-yellow brutal-transition">Piloto</Link>
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

