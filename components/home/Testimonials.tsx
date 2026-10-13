'use client'

import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'

const secondaryTestimonials = [
  {
    content: 'En solo 2 meses recuperamos la inversión. Los recordatorios automáticos redujeron las ausencias un 85%.',
    author: 'David Torres',
    position: 'CEO, FitZone Gym',
  },
  {
    content: 'El equipo de NexGent estuvo con nosotros en cada paso. La integración fue perfecta y los resultados inmediatos.',
    author: 'Carlos Ruiz',
    position: 'Director, Clínica Dental Sonrisa',
  },
  {
    content: 'Probamos otras soluciones antes, pero NexGent es diferente. Su IA realmente entiende a nuestros clientes.',
    author: 'Ana Fernández',
    position: 'Directora, Hotel Costa Blanca',
  },
]

export default function Testimonials() {
  return (
    <section className="py-28 bg-white w-full">
      <div className="max-w-6xl mx-auto px-6">
        {/* Testimonial principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          {/* Estrellas */}
          <div className="flex justify-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-xl" />
            ))}
          </div>

          <blockquote
            className="font-monda font-bold text-black leading-tight mb-8 max-w-4xl mx-auto"
            style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.2rem)' }}
          >
            "Con NexGent tenemos el 100% de las reservas automatizadas. Antes perdíamos citas porque el equipo no podía atender el teléfono. Ahora la IA lo gestiona todo — WhatsApp y llamadas — sin intervención humana."
          </blockquote>

          <div className="flex items-center justify-center gap-3">
            <div className="w-px h-4 bg-gray-300" />
            <p className="text-gray-600 font-medium">
              Hello Nails
            </p>
            <span className="text-gray-300">·</span>
            <p className="text-gray-400 text-sm">Cadena de salones con +200 centros</p>
          </div>
        </motion.div>

        {/* Testimoniales secundarios */}
        <div className="grid md:grid-cols-3 gap-6">
          {secondaryTestimonials.map((t, index) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-5 text-sm">"{t.content}"</p>
              <div>
                <p className="font-semibold text-black text-sm">{t.author}</p>
                <p className="text-gray-400 text-xs mt-0.5">{t.position}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
