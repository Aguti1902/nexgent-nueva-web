'use client'

import { motion } from 'framer-motion'
import { SiOpenai, SiGoogle, SiMeta } from 'react-icons/si'
import { FaShieldAlt, FaLock, FaServer, FaBolt, FaMicrosoft } from 'react-icons/fa'

const technologies = [
  { name: 'OpenAI GPT-4', icon: SiOpenai },
  { name: 'Google Cloud AI', icon: SiGoogle },
  { name: 'Meta LLaMA', icon: SiMeta },
  { name: 'Azure AI', icon: FaMicrosoft },
]

const features = [
  {
    icon: FaShieldAlt,
    title: 'Seguridad Enterprise',
    description: 'Cifrado end-to-end y cumplimiento RGPD',
  },
  {
    icon: FaLock,
    title: 'Privacidad Garantizada',
    description: 'Tus datos nunca se comparten',
  },
  {
    icon: FaServer,
    title: 'Infraestructura Escalable',
    description: 'Cloud de alta disponibilidad',
  },
  {
    icon: FaBolt,
    title: 'Rendimiento Óptimo',
    description: 'Respuestas en menos de 2 segundos',
  },
]

export default function TechStack() {
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
            Tecnología de última generación
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Utilizamos las mejores herramientas de IA del mercado
          </p>
        </motion.div>

        {/* Tecnologías */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 max-w-4xl mx-auto">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
            >
              <tech.icon className="text-5xl text-black mb-4" />
              <h3 className="font-semibold text-black text-sm">{tech.name}</h3>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <feature.icon className="text-black text-3xl mb-4" />
              <h3 className="font-bold text-black mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Certificaciones */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-black text-white rounded-2xl p-8">
            <p className="text-lg mb-6 text-gray-400">
              Certificados y cumplimiento normativo
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <span className="px-6 py-2 bg-white/10 rounded-lg border border-white/20">RGPD Compliant</span>
              <span className="px-6 py-2 bg-white/10 rounded-lg border border-white/20">ISO 27001</span>
              <span className="px-6 py-2 bg-white/10 rounded-lg border border-white/20">SOC 2 Type II</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
