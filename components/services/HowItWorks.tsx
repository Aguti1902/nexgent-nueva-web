'use client'

import { motion } from 'framer-motion'
import { FaClipboardCheck, FaCog, FaRocket, FaChartLine } from 'react-icons/fa'

const steps = [
  {
    number: '01',
    icon: FaClipboardCheck,
    title: 'Consulta Inicial',
    description: 'Analizamos tu negocio, procesos actuales y objetivos. Identificamos las áreas con mayor potencial de automatización.',
    duration: '1 día',
  },
  {
    number: '02',
    icon: FaCog,
    title: 'Configuración Personalizada',
    description: 'Diseñamos y entrenamos tu agente de IA específico, adaptado a tu industria, marca y necesidades particulares.',
    duration: '3-5 días',
  },
  {
    number: '03',
    icon: FaRocket,
    title: 'Lanzamiento',
    description: 'Implementamos el agente en tu sistema, integramos con tus herramientas existentes y realizamos pruebas exhaustivas.',
    duration: '2-3 días',
  },
  {
    number: '04',
    icon: FaChartLine,
    title: 'Optimización Continua',
    description: 'Monitorizamos el rendimiento, ajustamos según datos reales y mejoramos constantemente con feedback y aprendizaje automático.',
    duration: 'Continuo',
  },
]

export default function HowItWorks() {
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
            ¿Cómo funciona?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un proceso simple y rápido para tener tu agente de IA funcionando en menos de una semana
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-8 items-start"
            >
              {/* Número */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-black text-white rounded-2xl flex items-center justify-center">
                  <span className="font-monda text-3xl font-bold">{step.number}</span>
                </div>
              </div>

              {/* Contenido */}
              <div className="flex-1 pt-2">
                <h3 className="font-monda text-2xl md:text-3xl font-bold text-black mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4 text-lg">
                  {step.description}
                </p>
                <div className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
                  {step.duration}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resumen */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 bg-black text-white rounded-2xl p-12 text-center"
        >
          <h3 className="font-monda text-3xl md:text-4xl font-bold mb-4">
            Tu agente listo en menos de 7 días
          </h3>
          <p className="text-xl text-gray-400">
            Desde la primera consulta hasta el lanzamiento completo
          </p>
        </motion.div>
      </div>
    </section>
  )
}
