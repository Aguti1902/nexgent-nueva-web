'use client'

import { useState, useEffect } from 'react'
import { HiX } from 'react-icons/hi'
import Image from 'next/image'
import Button from './ui/Button'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosed, setIsClosed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar el popup después de hacer scroll 400px
      if (window.scrollY > 400 && !isClosed) {
        setIsVisible(true)
      } else if (window.scrollY <= 400) {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isClosed])

  const handleClose = () => {
    setIsClosed(true)
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-8 inset-x-0 z-50 flex justify-center px-4"
          style={{ maxWidth: '100vw', left: 0, right: 0 }}
        >
          <div className="bg-black text-white rounded-full shadow-2xl px-6 py-4 flex items-center gap-4 max-w-full border-2 border-white">
            {/* Avatares/Logo */}
            <div className="flex items-center -space-x-2 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-black overflow-hidden">
                <Image 
                  src="/images/ISOTIPO.png" 
                  alt="NexGent" 
                  width={32} 
                  height={32}
                  className="object-contain"
                />
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-black">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
            </div>

            {/* Texto */}
            <p className="text-sm font-medium whitespace-nowrap">
              ¿Quieres ver cómo NexGent puede transformar tu negocio?
            </p>

            {/* Botón CTA */}
            <Button 
              href="/demo" 
              variant="primary"
              size="sm"
              className="bg-white !text-black hover:!bg-gray-200 flex-shrink-0"
            >
              Pide una demo
            </Button>

            {/* Botón cerrar */}
            <button
              onClick={handleClose}
              className="ml-2 text-white/70 hover:text-white transition-colors flex-shrink-0"
              aria-label="Cerrar"
            >
              <HiX size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

