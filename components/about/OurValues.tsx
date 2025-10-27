'use client'

import { motion } from 'framer-motion'
import { FaLightbulb, FaHandshake, FaChartLine, FaShieldAlt } from 'react-icons/fa'

const values = [
  {
    icon: FaLightbulb,
    title: 'Innovación',
    description: 'Estamos siempre a la vanguardia de la tecnología de IA, buscando las mejores soluciones para nuestros clientes.',
  },
  {
    icon: FaHandshake,
    title: 'Transparencia',
    description: 'Comunicación clara y honesta. Sin letra pequeña, sin sorpresas. Solo resultados medibles.',
  },
  {
    icon: FaChartLine,
    title: 'Resultados',
    description: 'Nos enfocamos en generar valor real. Si no ves resultados, no estamos haciendo bien nuestro trabajo.',
  },
  {
    icon: FaShieldAlt,
    title: 'Confiabilidad',
    description: 'Tu negocio depende de nuestros agentes. Por eso garantizamos disponibilidad 24/7 y soporte inmediato.',
  },
]

export default function OurValues() {
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
            Nuestros valores
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Los principios que guían cada decisión que tomamos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300"
            >
              <div className="inline-flex w-14 h-14 bg-black text-white items-center justify-center rounded-xl mb-6">
                <value.icon size={28} />
              </div>
              <h3 className="font-monda text-2xl font-bold text-black mb-4">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
