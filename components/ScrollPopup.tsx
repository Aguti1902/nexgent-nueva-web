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
          className="fixed bottom-24 inset-x-0 z-50 flex justify-center px-2 md:px-4"
          style={{ maxWidth: '100vw', left: 0, right: 0 }}
        >
          <div className="bg-black text-white rounded-full shadow-2xl px-3 md:px-6 py-3 md:py-4 flex items-center gap-2 md:gap-4 w-full md:w-auto max-w-full border border-white">
            {/* Avatares/Logo */}
            <div className="flex items-center -space-x-2 flex-shrink-0">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center border-2 border-black overflow-hidden">
                <Image 
                  src="/images/FOTO1.png" 
                  alt="Cliente 1" 
                  width={40} 
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center border-2 border-black overflow-hidden">
                <Image 
                  src="/images/FOTO2.png" 
                  alt="Cliente 2" 
                  width={40} 
                  height={40}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Texto */}
            <p className="text-xs md:text-sm font-medium whitespace-nowrap">
              <span className="hidden md:inline">¿Quieres ver cómo NexGent puede transformar tu negocio?</span>
              <span className="md:hidden">Transforma tu negocio</span>
            </p>

            {/* Botón CTA */}
            <Button 
              href="/demo" 
              variant="primary"
              size="sm"
              className="bg-white !text-black hover:!bg-gray-200 flex-shrink-0 !text-xs md:!text-sm !px-3 md:!px-4 !py-2"
            >
              <span className="hidden sm:inline">Pide una demo</span>
              <span className="sm:hidden">Demo</span>
            </Button>

            {/* Botón cerrar */}
            <button
              onClick={handleClose}
              className="text-white/70 hover:text-white transition-colors flex-shrink-0"
              aria-label="Cerrar"
            >
              <HiX size={16} className="md:hidden" />
              <HiX size={20} className="hidden md:block" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

