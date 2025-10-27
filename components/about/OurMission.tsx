'use client'

import { motion } from 'framer-motion'
import { FaBullseye, FaEye } from 'react-icons/fa'

export default function OurMission() {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex w-16 h-16 bg-black text-white items-center justify-center rounded-2xl mb-6">
              <FaBullseye size={32} />
            </div>
            <h3 className="font-monda text-4xl font-bold text-black mb-6">
              Nuestra misión
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Democratizar la inteligencia artificial para que cualquier empresa, sin importar su tamaño,
              pueda beneficiarse de la automatización inteligente. Creemos que la IA debe ser accesible,
              fácil de implementar y, sobre todo, debe generar resultados medibles.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex w-16 h-16 bg-black text-white items-center justify-center rounded-2xl mb-6">
              <FaEye size={32} />
            </div>
            <h3 className="font-monda text-4xl font-bold text-black mb-6">
              Nuestra visión
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Convertirnos en el partner tecnológico de referencia para empresas que buscan crecer mediante
              la automatización inteligente. Queremos ser conocidos por nuestra capacidad de generar resultados
              tangibles y por la calidad de nuestro servicio.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
