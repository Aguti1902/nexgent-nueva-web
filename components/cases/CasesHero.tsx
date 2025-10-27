'use client'

import { motion } from 'framer-motion'

export default function CasesHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-white overflow-hidden pt-24">
      {/* Grid sutil de fondo */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="container-custom px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <div className="inline-block mb-8">
            <div className="bg-gray-100 rounded-full px-5 py-2">
              <span className="font-medium text-gray-700 text-sm">Resultados reales</span>
            </div>
          </div>

          <h1 className="font-monda text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-black leading-[1.1]">
            Casos de
            <br />
            éxito
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            Empresas que ya están automatizando con IA y logrando resultados excepcionales
          </p>
        </motion.div>
      </div>
    </section>
  )
}
