'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa'

const metrics = [
  { value: '+42%', label: 'Reservas', detail: 'incremento mensual' },
  { value: '-68%', label: 'No-shows', detail: 'reducción de ausencias' },
  { value: '€2.1K', label: 'Extra/mes', detail: 'ingresos adicionales por centro' },
  { value: '95%', label: 'Ocupación', detail: 'promedio en todos los centros' },
]

const beforeAfter = [
  { metric: 'Ocupación promedio', before: '68%', after: '95%' },
  { metric: 'No-shows', before: '30%', after: '9.6%' },
  { metric: 'Reservas/mes', before: '2,400', after: '3,408' },
  { metric: 'Tiempo gestión/día', before: '4 horas', after: '25 min' },
]

const solution = [
  'CRM a medida para +200 centros de franquicia',
  'Agente IA en WhatsApp para agendar, confirmar y gestionar citas',
  'Sistema de llamadas con IA para recordatorios y recuperación de citas',
  'Panel centralizado con analytics para franquiciados',
  'Integración completa con los sistemas existentes de Hello Nails',
]

const timeline = [
  { phase: 'Semanas 1–2', title: 'Análisis y diseño', description: 'Mapeo completo de la operativa de Hello Nails: flujos de trabajo, sistemas existentes y cuellos de botella en los 200 centros.' },
  { phase: 'Semanas 3–6', title: 'Desarrollo del CRM', description: 'Construcción del panel multi-franquicia, gestión de clientes, historial de citas y sistema de reportes desde cero.' },
  { phase: 'Semanas 7–8', title: 'Integración IA', description: 'Configuración del agente de WhatsApp y el sistema de llamadas. Entrenamiento con datos reales de la franquicia.' },
  { phase: 'Mes 3+', title: 'Lanzamiento y optimización', description: 'Despliegue en todos los centros, formación del equipo y refinamiento continuo de la IA con datos reales.' },
]

export default function HelloNailsCaseStudy() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-0 bg-[#0a0a0a] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors mb-12 text-sm"
          >
            ← Volver al inicio
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold text-white/70 uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#82cbd4]" />
                Caso de éxito real
              </span>

              <div className="relative w-44 h-14 mb-6 brightness-0 invert opacity-90">
                <Image
                  src="/images/logos/HELLO NAILS.png"
                  alt="Hello Nails"
                  fill
                  className="object-contain object-left"
                />
              </div>

              <h1
                className="font-monda font-bold text-white leading-tight mb-6"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                Cómo Hello Nails automatizó sus +200 centros con IA
              </h1>

              <p className="text-white/60 text-lg leading-relaxed">
                Salón de uñas y belleza · Más de 200 centros en España
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative h-80 lg:h-96 rounded-3xl overflow-hidden"
            >
              <Image
                src="/images/FOTO HELLO NAILS.webp"
                alt="Hello Nails - Salón de belleza"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>

        {/* Métricas banner */}
        <div className="border-t border-white/10 bg-white/5">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <p className="font-monda font-bold text-white text-4xl lg:text-5xl leading-none mb-1">{metric.value}</p>
                  <p className="text-white font-semibold text-sm">{metric.label}</p>
                  <p className="text-white/40 text-xs mt-0.5">{metric.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* El problema */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">El problema</p>
              <h2 className="font-monda font-bold text-3xl text-black mb-6">Antes de NexGent</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Con más de 200 centros operando simultáneamente, Hello Nails enfrentaba un problema crítico: el <strong>30% de las citas no se completaban</strong> por ausencias de clientes.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                La gestión manual de reservas y recordatorios consumía más de 4 horas diarias por centro. La ocupación promedio se mantenía en un bajo 68%, dejando horas sin facturar cada día.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Además, <strong>no existía un sistema centralizado</strong>: cada centro gestionaba sus propias reservas de forma inconsistente, sin visibilidad para los franquiciados.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">La solución</p>
              <h2 className="font-monda font-bold text-3xl text-black mb-6">Lo que construimos</h2>
              <ul className="space-y-3">
                {solution.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FaCheckCircle className="text-black mt-1 flex-shrink-0 text-sm" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Antes vs Después */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="font-monda font-bold text-white text-4xl md:text-5xl">Antes y después</h2>
            <p className="text-white/50 mt-3">Impacto real en métricas clave de negocio</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {beforeAfter.map((item, index) => (
              <motion.div
                key={item.metric}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <p className="text-white/50 text-sm mb-4">{item.metric}</p>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs text-white/30 mb-1">Antes</p>
                    <p className="font-monda font-bold text-red-400 text-3xl">{item.before}</p>
                  </div>
                  <FaArrowRight className="text-white/20 text-xl flex-shrink-0" />
                  <div>
                    <p className="text-xs text-white/30 mb-1">Después</p>
                    <p className="font-monda font-bold text-[#82cbd4] text-3xl">{item.after}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-8">
              <div className="relative w-10 h-10">
                <Image src="/images/logos/HELLO NAILS.png" alt="Hello Nails" fill className="object-contain" />
              </div>
            </div>

            <blockquote
              className="font-monda font-bold text-black leading-tight mb-8"
              style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2rem)' }}
            >
              "Pasamos de perder reservas cada día a tener el 100% automatizado. NexGent construyó nuestro CRM e integró la IA que ahora gestiona WhatsApp y llamadas."
            </blockquote>

            <p className="text-gray-500">Hello Nails · Cadena de salones con +200 centros</p>
          </motion.div>
        </div>
      </section>

      {/* Cronología */}
      <section className="py-24 bg-[#f9fafb]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            <h2 className="font-monda font-bold text-black text-4xl">Cómo lo construimos</h2>
            <p className="text-gray-500 mt-3">Del primer análisis al sistema en producción</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-7 top-0 bottom-0 w-px bg-gray-200" />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-20"
                >
                  <div className="absolute left-0 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold font-monda text-center leading-tight">
                    {index + 1}
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <span className="inline-block bg-black text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                      {item.phase}
                    </span>
                    <h3 className="font-monda font-bold text-black text-xl mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-monda font-bold text-white leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              ¿Tu franquicia es la próxima?
            </h2>
            <p className="text-white/60 text-lg mb-10">
              Agenda una llamada de 30 minutos y te mostramos exactamente qué construiríamos para ti.
            </p>
            <Link
              href="/contacto"
              className="inline-block bg-white text-black font-bold px-10 py-5 rounded-full text-lg hover:bg-gray-100 transition-all duration-200 shadow-2xl whitespace-nowrap"
            >
              Agenda una llamada gratuita
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
