'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useNexibot } from '@/contexts/NexibotContext'
import { FaRobot } from 'react-icons/fa'

export default function NexibotTransition() {
  const { isTransitioning } = useNexibot()

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          {/* Efecto de círculo expandiéndose */}
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 100, rotate: 360 }}
            exit={{ scale: 0, rotate: -360 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"
            style={{ filter: 'blur(40px)' }}
          />

          {/* Logo NEXIBOT */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-10 flex flex-col items-center gap-4"
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              <FaRobot className="text-8xl text-yellow-400" />
            </motion.div>
            <motion.h2 
              className="font-monda text-4xl font-bold text-white"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              NEXIBOT
            </motion.h2>
            <motion.p
              className="text-yellow-400 text-sm uppercase tracking-wider"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Activando modo creación de agentes...
            </motion.p>
          </motion.div>

          {/* Partículas flotantes */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0 
              }}
              animate={{ 
                y: [null, Math.random() * window.innerHeight],
                opacity: [0, 1, 0],
              }}
              transition={{ 
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 0.5
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

