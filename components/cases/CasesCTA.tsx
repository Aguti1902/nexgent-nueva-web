'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function CasesCTA() {
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
            ¿Quieres ser nuestro
            <br />
            próximo caso de éxito?
          </h2>
          <p className="text-2xl text-gray-600 mb-12 leading-relaxed">
            Agenda una demo y descubre cómo podemos transformar tu negocio
          </p>
          <Button variant="primary" size="lg" href="/demo">
            Solicita tu demo gratuita
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
