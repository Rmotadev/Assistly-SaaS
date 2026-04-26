'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play } from 'lucide-react'

export function DemoModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 px-8 py-4 bg-white text-brutal-charcoal border-4 border-brutal-charcoal font-bold text-lg brutal-shadow brutal-transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
      >
        <Play className="w-5 h-5 fill-brutal-charcoal" />
        Ver demonstração
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-brutal-charcoal/80 z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-4xl z-50"
            >
              <div className="bg-white border-4 border-brutal-charcoal overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b-4 border-brutal-charcoal bg-brutal-charcoal">
                  <h3 className="font-display text-2xl text-brutal-yellow">Demonstração Assistly</h3>
                  <button onClick={() => setIsOpen(false)} className="text-white hover:text-brutal-yellow">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="aspect-video bg-brutal-dark flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-brutal-yellow border-4 border-brutal-charcoal flex items-center justify-center mx-auto mb-6">
                      <Play className="w-8 h-8 fill-brutal-charcoal text-brutal-charcoal" />
                    </div>
                    <p className="font-display text-2xl text-white">Vídeo em breve</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
