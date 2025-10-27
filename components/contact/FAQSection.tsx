'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

const faqs = [
  {
    question: '¿Cuánto tiempo tarda la implementación?',
    answer: 'La implementación completa de tu agente de IA tarda entre 5 y 7 días hábiles. Esto incluye la configuración personalizada, entrenamiento, integración con tus sistemas y pruebas exhaustivas.',
  },
  {
    question: '¿Necesito conocimientos técnicos?',
    answer: 'No, absolutamente ninguno. Nosotros nos encargamos de todo el proceso técnico. Tú solo necesitas proporcionarnos información sobre tu negocio y tus necesidades, y nosotros hacemos el resto.',
  },
  {
    question: '¿Qué idiomas soportan los agentes?',
    answer: 'Nuestros agentes soportan más de 50 idiomas, incluyendo español, inglés, francés, alemán, italiano y muchos más. Pueden cambiar entre idiomas automáticamente según el cliente.',
  },
  {
    question: '¿Puedo probar antes de comprometerme?',
    answer: 'Sí, ofrecemos una demo en vivo gratuita donde podrás ver exactamente cómo funcionará tu agente. Además, los primeros 30 días incluyen garantía de satisfacción total.',
  },
  {
    question: '¿Qué pasa si el agente no sabe responder algo?',
    answer: 'El agente está entrenado para reconocer cuando no puede ayudar y escalar la conversación a un humano de forma natural. También aprende continuamente de cada interacción.',
  },
  {
    question: '¿Cómo se protegen mis datos?',
    answer: 'Utilizamos cifrado end-to-end, cumplimos con RGPD y todas las normativas europeas. Tus datos nunca se usan para entrenar modelos públicos ni se comparten con terceros.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-monda text-5xl font-bold text-black mb-6">
            Preguntas frecuentes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Respuestas a las dudas más comunes
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-black text-lg pr-8">
                  {faq.question}
                </span>
                <FaChevronDown
                  className={`text-black flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
