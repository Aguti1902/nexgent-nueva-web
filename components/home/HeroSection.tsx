'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const metrics = [
  { value: '+42%', label: 'más reservas' },
  { value: '-68%', label: 'no-shows' },
  { value: '100%', label: 'atención 24/7' },
  { value: '+200', label: 'centros activos' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden w-full">
      {/* Dot pattern de fondo */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <Link
            href="/casos-exito/hello-nails"
            className="group inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-sm text-white/80 hover:bg-white/15 hover:text-white transition-all duration-200"
          >
            <span className="w-2 h-2 rounded-full bg-[#82cbd4] animate-pulse" />
            Caso de éxito: Hello Nails
            <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
          </Link>
        </motion.div>

        {/* Heading principal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-monda font-bold text-white leading-[1.1] tracking-tight mb-6"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          Construimos el CRM de tu
          <br />
          <span className="text-[#82cbd4]">franquicia con IA integrada</span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Desarrollamos software a medida que automatiza citas, clientes y operaciones — con IA que atiende por WhatsApp y llamadas las 24 horas.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link
            href="/casos-exito/hello-nails"
            className="bg-white text-black font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-200 shadow-xl whitespace-nowrap"
          >
            Ver caso de éxito
          </Link>
          <Link
            href="/contacto"
            className="flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-200 whitespace-nowrap"
          >
            Hablar con nosotros
            <span>→</span>
          </Link>
        </motion.div>

        {/* Chips de métricas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.value}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2.5"
            >
              <span className="font-monda font-bold text-white text-sm">{metric.value}</span>
              <span className="text-white/50 text-sm">{metric.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
