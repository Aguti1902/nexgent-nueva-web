'use client'

import { motion } from 'framer-motion'

export default function OurStory() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-monda text-5xl md:text-6xl font-bold text-black mb-6">
              Nuestra historia
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8 text-lg text-gray-600 leading-relaxed"
          >
            <p>
              NexGent nace de la visión de hacer la inteligencia artificial accesible para todas las empresas,
              sin importar su tamaño. Vimos cómo muchos negocios luchaban con tareas repetitivas que consumían
              tiempo valioso que podrían dedicar a crecer.
            </p>
            <p>
              Combinamos nuestra experiencia en tecnología con un profundo entendimiento de las necesidades
              empresariales para crear agentes de IA que realmente funcionan. No son chatbots simples, son
              asistentes inteligentes que aprenden y se adaptan a tu negocio.
            </p>
            <p>
              Hoy, ayudamos a decenas de empresas a automatizar sus operaciones, mejorar la experiencia de
              sus clientes y aumentar significativamente sus resultados. Y estamos solo empezando.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
