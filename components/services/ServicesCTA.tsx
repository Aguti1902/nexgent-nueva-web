'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { FaCheckCircle } from 'react-icons/fa'

export default function ServicesCTA() {
  return (
    <section className="py-32 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-monda text-5xl md:text-6xl font-bold text-black mb-8">
            ¿Listo para transformar
            <br />
            tu negocio?
          </h2>
          <p className="text-2xl text-gray-600 mb-12 leading-relaxed">
            Agenda una consulta gratuita y descubre qué servicio se adapta mejor a tus necesidades
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="primary" size="lg" href="/contacto">
              Solicitar consulta gratuita
            </Button>
            <Button variant="outline" size="lg" href="/casos-exito">
              Ver casos de éxito
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              'Demo en vivo sin coste',
              'Implementación en 7 días',
              'Garantía de satisfacción',
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200">
                <FaCheckCircle className="text-xl text-black" />
                <span className="font-medium text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
