'use client'

import { motion } from 'framer-motion'
import { FaBolt, FaCheckCircle, FaHeadset, FaChartBar } from 'react-icons/fa'

const reasons = [
  {
    icon: FaBolt,
    title: 'Implementación ultrarrápida',
    description: 'Tu agente de IA funcionando en menos de 7 días. No meses, no semanas. Días.',
  },
  {
    icon: FaCheckCircle,
    title: 'Resultados garantizados',
    description: 'Si no ves mejoras medibles en 30 días, te devolvemos tu dinero. Así de seguros estamos.',
  },
  {
    icon: FaHeadset,
    title: 'Soporte dedicado 24/7',
    description: 'Un equipo real de personas disponible cuando lo necesites. No bots para atención al cliente.',
  },
  {
    icon: FaChartBar,
    title: 'Mejora continua',
    description: 'Tu agente aprende y mejora constantemente. Cada interacción lo hace más inteligente.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-monda text-5xl md:text-6xl font-bold text-black mb-6">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lo que nos hace diferentes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-8 border border-gray-200"
            >
              <div className="inline-flex w-14 h-14 bg-black text-white items-center justify-center rounded-xl mb-6">
                <reason.icon size={28} />
              </div>
              <h3 className="font-monda text-2xl font-bold text-black mb-4">
                {reason.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
