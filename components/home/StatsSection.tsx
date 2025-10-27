'use client'

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface StatProps {
  value: number
  label: string
  suffix?: string
  prefix?: string
}

function AnimatedCounter({ value, label, suffix = '', prefix = '' }: StatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 3000 })
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Math.floor(latest).toLocaleString() + suffix
      }
    })

    return () => unsubscribe()
  }, [springValue, prefix, suffix])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div 
        ref={ref}
        className="font-monda text-6xl md:text-7xl font-bold text-white mb-3"
      >
        0
      </div>
      <p className="text-base text-gray-400">{label}</p>
    </motion.div>
  )
}

export default function StatsSection() {
  return (
    <section className="py-24 bg-black overflow-x-hidden w-full max-w-full">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-monda text-5xl md:text-6xl font-bold text-white mb-6">
            Resultados medibles
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Datos reales de empresas que automatizan con IA
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto">
          <AnimatedCounter value={90} label="Ahorro de tiempo operativo" suffix="%" />
          <AnimatedCounter value={65} label="Reducción en ausencias" suffix="%" />
          <AnimatedCounter value={24} label="Disponibilidad continua" suffix="/7" />
        </div>
      </div>
    </section>
  )
}
