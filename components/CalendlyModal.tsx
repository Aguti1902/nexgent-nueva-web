'use client'

import { useEffect } from 'react'
import { InlineWidget } from 'react-calendly'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'

interface CalendlyModalProps {
  isOpen: boolean
  onClose: () => void
  userData?: {
    name?: string
    email?: string
    phone?: string
    company?: string
  }
  calendlyUrl: string
}

export default function CalendlyModal({ isOpen, onClose, userData, calendlyUrl }: CalendlyModalProps) {
  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Preparar datos prefill para Calendly
  const prefillData = {
    name: userData?.name || '',
    email: userData?.email || '',
    customAnswers: {
      a1: userData?.phone || '', // Teléfono
      a2: userData?.company || '', // Empresa
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-[61] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-black px-6 py-4 flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="text-xl font-bold text-white">📅 Agenda tu Demo</h2>
                <p className="text-sm text-gray-400">Elige la fecha y hora que mejor te convenga</p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-300 transition-colors p-2"
                aria-label="Cerrar"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Calendly Widget */}
            <div className="flex-1 overflow-hidden">
              <InlineWidget
                url={calendlyUrl}
                prefill={prefillData}
                styles={{
                  height: '100%',
                  width: '100%',
                }}
                pageSettings={{
                  backgroundColor: 'ffffff',
                  hideEventTypeDetails: false,
                  hideLandingPageDetails: false,
                  primaryColor: '000000',
                  textColor: '000000',
                }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

