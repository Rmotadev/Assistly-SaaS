'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'

export function PricingToggle() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: 'Essencial',
      price: isAnnual ? '237' : '297',
      description: 'Ideal para escritórios menores automatizarem NFs e relatórios.',
      features: [
        'Agente NF (até 500 NFs/mês)',
        'Agente Relatório Semanal',
        'Exportação para sistemas contábeis',
        'Suporte por e-mail',
      ],
      popular: false,
    },
    {
      name: 'Completo',
      price: isAnnual ? '397' : '497',
      description: 'Todos os agentes para escritórios em crescimento.',
      features: [
        'Tudo do plano Essencial',
        'Agente Leads (WhatsApp + Instagram)',
        'NFs ilimitadas',
        'Suporte prioritário',
      ],
      popular: true,
    },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex justify-center mb-10 sm:mb-16">
        <div className="flex border-4 border-brutal-charcoal bg-white brutal-shadow">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-5 py-2.5 sm:px-8 sm:py-3 font-bold text-sm sm:text-lg brutal-transition ${
              !isAnnual ? 'bg-brutal-charcoal text-white' : 'text-brutal-charcoal hover:bg-brutal-sage/20'
            }`}
          >
            Mensal
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-5 py-2.5 sm:px-8 sm:py-3 font-bold text-sm sm:text-lg flex items-center gap-2 brutal-transition border-l-4 border-brutal-charcoal ${
              isAnnual ? 'bg-brutal-charcoal text-white' : 'text-brutal-charcoal hover:bg-brutal-sage/20'
            }`}
          >
            Anual <span className="bg-brutal-yellow text-brutal-charcoal px-2 py-0.5 text-xs font-bold border-2 border-brutal-charcoal">-20%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col p-6 sm:p-10 border-4 border-brutal-charcoal brutal-transition hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(23,30,25,1)] ${
              plan.popular
                ? 'bg-brutal-charcoal text-white shadow-[8px_8px_0px_0px_rgba(255,225,124,1)]'
                : 'bg-white text-brutal-charcoal brutal-shadow'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <span className="bg-brutal-yellow text-brutal-charcoal font-bold text-sm px-4 py-1 border-4 border-brutal-charcoal">
                  MAIS POPULAR
                </span>
              </div>
            )}
            
            <div className="mb-8 pb-6 border-b-2 border-current/20">
              <h3 className="font-display text-3xl sm:text-4xl mb-3">{plan.name}</h3>
              <p className="font-medium opacity-60">{plan.description}</p>
            </div>

            <div className="mb-10">
              <div className="flex items-baseline gap-1">
                <span className="font-display text-5xl sm:text-7xl tracking-tight">R${plan.price}</span>
                <span className="font-bold text-lg opacity-50">/mês</span>
              </div>
              {isAnnual && (
                <p className="mt-2 text-sm font-bold opacity-50">faturado anualmente</p>
              )}
            </div>

            <ul className="flex-1 space-y-5 mb-10">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className={`w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 ${plan.popular ? 'bg-brutal-yellow' : 'bg-brutal-charcoal'}`}>
                    <Check className={`w-3.5 h-3.5 ${plan.popular ? 'text-brutal-charcoal' : 'text-white'}`} />
                  </div>
                  <span className="font-bold">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/register"
              className={`block w-full py-5 text-center font-bold text-lg border-4 border-brutal-charcoal brutal-transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none ${
                plan.popular
                  ? 'bg-brutal-yellow text-brutal-charcoal brutal-shadow'
                  : 'bg-brutal-charcoal text-white brutal-shadow hover:bg-brutal-yellow hover:text-brutal-charcoal'
              }`}
            >
              Começar grátis
            </Link>
          </div>
        ))}
      </div>
      
      <p className="text-center font-bold mt-12 opacity-50">
        14 dias grátis em todos os planos. Cancele quando quiser.
      </p>
    </div>
  )
}
