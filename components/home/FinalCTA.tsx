'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { FaCheckCircle } from 'react-icons/fa'

export default function FinalCTA() {
  return (
    <section className="py-32 bg-black text-white relative overflow-hidden w-full max-w-full border-b border-gray-800">
      {/* Grid de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="font-monda text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1]">
            ¿Listo para automatizar
            <br />
            tu negocio?
          </h2>
          
          <p className="text-2xl text-gray-400 mb-12 leading-relaxed">
            Agenda una demo gratuita y descubre cómo la IA puede
            <br className="hidden md:block" />
            transformar tu empresa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              variant="white" 
              size="lg" 
              href="/demo"
            >
              Solicita una demo gratuita
            </Button>
          </div>

          {/* Beneficios en línea */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-white" />
              <span>Sin permanencia</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-white" />
              <span>Listo en 48h</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-white" />
              <span>Soporte completo</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
