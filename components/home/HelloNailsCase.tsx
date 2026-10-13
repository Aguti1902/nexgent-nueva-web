'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const metrics = [
  { value: '+42%', label: 'Reservas' },
  { value: '-68%', label: 'No-shows' },
  { value: '€2.1K', label: 'Extra/mes/centro' },
  { value: '95%', label: 'Ocupación' },
]

export default function HelloNailsCase() {
  return (
    <section className="py-28 bg-[#0a0a0a] w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold text-white/70 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#82cbd4]" />
            Caso de éxito real
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: texto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Logo Hello Nails */}
            <div className="relative w-44 h-16 mb-8 brightness-0 invert opacity-90">
              <Image
                src="/images/logos/HELLO NAILS.png"
                alt="Hello Nails"
                fill
                className="object-contain object-left"
              />
            </div>

            <h2
              className="font-monda font-bold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
            >
              Hello Nails multiplicó sus reservas con NexGent
            </h2>

            <p className="text-white/60 leading-relaxed mb-10 text-lg">
              Construimos su CRM desde cero e integramos IA para WhatsApp y llamadas en sus +200 centros. El resultado: cero intervención humana para gestionar citas.
            </p>

            {/* Métricas */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.value}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5"
                >
                  <p className="font-monda font-bold text-white text-3xl lg:text-4xl leading-none mb-1">
                    {metric.value}
                  </p>
                  <p className="text-white/50 text-sm">{metric.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="border-l-2 border-[#82cbd4] pl-5 mb-8">
              <p className="text-white/70 italic leading-relaxed">
                "Pasamos de perder reservas cada día a tener el 100% automatizado. NexGent construyó nuestro CRM e integró la IA que ahora gestiona WhatsApp y llamadas."
              </p>
              <footer className="mt-3 text-white/40 text-sm">
                — Hello Nails, cadena de salones con +200 centros
              </footer>
            </blockquote>

            <Link
              href="/casos-exito/hello-nails"
              className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-all duration-200"
            >
              Ver el caso completo
              <span>→</span>
            </Link>
          </motion.div>

          {/* Right: foto */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden">
              <Image
                src="/images/FOTO HELLO NAILS.webp"
                alt="Hello Nails - Salón de belleza"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-2xl">
              <p className="font-monda font-bold text-black text-2xl">+200</p>
              <p className="text-gray-500 text-xs">centros activos</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
