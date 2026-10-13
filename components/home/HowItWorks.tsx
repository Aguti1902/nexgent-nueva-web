'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Analizamos tu franquicia',
    description:
      'Estudiamos tu operativa, tus cuellos de botella y lo que automatizar primero. Sin tecnicismos: entendemos tu negocio antes de escribir una línea de código.',
  },
  {
    number: '02',
    title: 'Construimos tu CRM + IA',
    description:
      'Desarrollo a medida en 4–8 semanas. Integración con WhatsApp y sistema de llamadas. Todo configurado para tu modelo de franquicia.',
  },
  {
    number: '03',
    title: 'Lanzamos y optimizamos',
    description:
      'Tu equipo empieza a usar el sistema. Refinamos la IA con datos reales. Mejora continua hasta que funcione a la perfección.',
  },
]

export default function HowItWorks() {
  return (
    <section id="proceso" className="py-28 bg-white w-full">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Nuestro proceso
          </p>
          <h2 className="font-monda font-bold text-black leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            De cero a automatizado
            <br />
            en pocas semanas.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Línea conectora desktop */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gray-200" style={{ left: '8%', right: '8%' }} />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                {/* Número con círculo */}
                <div className="relative z-10 w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-6">
                  <span className="font-monda font-bold text-sm">{step.number}</span>
                </div>

                <h3 className="font-monda font-bold text-xl text-black mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
