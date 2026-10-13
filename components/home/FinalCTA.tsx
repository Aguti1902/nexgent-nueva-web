'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="py-32 bg-[#0a0a0a] w-full overflow-hidden relative">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className="font-monda font-bold text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            ¿Tu franquicia
            <br />
            es la próxima?
          </h2>

          <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Agenda una llamada de 30 minutos y te mostramos exactamente qué construiríamos para ti.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="bg-white text-black font-bold px-10 py-5 rounded-full text-lg hover:bg-gray-100 transition-all duration-200 shadow-2xl whitespace-nowrap"
            >
              Agenda una llamada gratuita
            </Link>
            <Link
              href="/casos-exito/hello-nails"
              className="flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-5 rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-200 whitespace-nowrap"
            >
              Ver caso Hello Nails →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
