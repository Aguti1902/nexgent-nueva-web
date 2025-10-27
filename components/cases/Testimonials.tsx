'use client'

import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'

const testimonials = [
  {
    name: 'Laura Martínez',
    position: 'Directora de Operaciones',
    company: 'Hello Nails',
    rating: 5,
    testimonial: 'La implementación fue rapidísima y los resultados superaron nuestras expectativas. El agente de IA gestiona cientos de conversaciones diarias con una naturalidad increíble.',
  },
  {
    name: 'Carlos Ruiz',
    position: 'Propietario',
    company: 'Style Studio',
    rating: 5,
    testimonial: 'Nuestro ticket medio ha aumentado un 45% gracias al upselling inteligente del agente. Lo mejor es que no se siente forzado para los clientes.',
  },
  {
    name: 'Ana Torres',
    position: 'Gerente',
    company: 'FitZone',
    rating: 5,
    testimonial: 'La experiencia de nuestros clientes ha mejorado notablemente. Pueden reservar clases a cualquier hora y los recordatorios automáticos han reducido las ausencias a la mitad.',
  },
  {
    name: 'Miguel Ángel López',
    position: 'Director',
    company: 'Wellness Center',
    rating: 5,
    testimonial: 'El soporte de NexGent es excepcional. Siempre están disponibles para ayudarnos y el agente aprende continuamente de cada interacción.',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-monda text-5xl md:text-6xl font-bold text-black mb-6">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Testimonios reales de empresas que ya automatizan con NexGent
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-black text-lg" />
                ))}
              </div>

              {/* Testimonial */}
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                "{testimonial.testimonial}"
              </p>

              {/* Author */}
              <div className="border-t border-gray-200 pt-6">
                <p className="font-bold text-black text-lg">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.position}</p>
                <p className="text-sm text-gray-500">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
