'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'Preciso trocar meu sistema contábil?',
    answer: 'Não. O Assistly atua como uma camada inteligente por cima das suas ferramentas atuais. Exportamos os dados processados diretamente para o formato que seu sistema (Domínio, TOTVS, ContaAzul) já aceita.',
  },
  {
    question: 'Como funciona o trial de 14 dias?',
    answer: 'Você cria sua conta sem precisar inserir cartão de crédito e tem acesso a todos os recursos do plano escolhido por 14 dias.',
  },
  {
    question: 'Meus dados ficam seguros?',
    answer: 'Sim. Todo o processamento segue as normas da LGPD. Os dados são criptografados e o acesso é restrito à sua conta.',
  },
  {
    question: 'O agente responde com minha voz/identidade?',
    answer: 'Sim. Na configuração inicial, você define o tom de voz e os padrões do seu escritório para as interações via WhatsApp e Instagram.',
  },
  {
    question: 'Posso cancelar a qualquer momento?',
    answer: 'Absolutamente. Sem contratos de fidelidade, cancele a qualquer instante direto no painel.',
  },
  {
    question: 'Quantas NFs posso processar?',
    answer: 'No plano Essencial, até 500 NFs/mês. No plano Completo, processamento ilimitado.',
  },
]

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-3 sm:space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index

        return (
          <div 
            key={index} 
            className={`border-4 border-brutal-charcoal brutal-transition ${
              isOpen ? 'bg-brutal-charcoal text-white' : 'bg-white text-brutal-charcoal hover:bg-brutal-sage/10'
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between text-left p-4 sm:p-6 focus:outline-none"
            >
              <span className="font-bold text-base sm:text-lg pr-4 sm:pr-6">{faq.question}</span>
              <div className={`w-8 h-8 border-2 border-current flex items-center justify-center shrink-0 brutal-transition ${
                isOpen ? 'bg-brutal-yellow text-brutal-charcoal' : ''
              }`}>
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-4 sm:px-6 sm:pb-6 text-brutal-sage text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
