'use client'

import Link from 'next/link'
import { FaCalculator, FaArrowRight } from 'react-icons/fa'

interface CalculadoraCTAProps {
  sector: 'estetica-belleza' | 'clinicas-dentales' | 'restauracion' | 'gimnasios-fitness' | 'inmobiliarias'
}

const sectorLabels = {
  'estetica-belleza': 'Estética y Belleza',
  'clinicas-dentales': 'Clínicas Dentales',
  'restauracion': 'Restauración',
  'gimnasios-fitness': 'Gimnasios y Fitness',
  'inmobiliarias': 'Inmobiliarias'
}

export default function CalculadoraCTA({ sector }: CalculadoraCTAProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden">
          {/* Patrón decorativo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-20" />

          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-500 p-4 rounded-2xl">
                <FaCalculator className="text-4xl" />
              </div>
            </div>

            <h2 className="font-monda text-3xl lg:text-4xl font-bold text-center mb-4">
              ¿Cuánto costaría para tu franquicia de {sectorLabels[sector]}?
            </h2>

            <p className="text-xl text-white/80 text-center mb-8 max-w-2xl mx-auto">
              Calcula tu inversión exacta en 30 segundos y descubre cuánto vas a ahorrar y ganar con NexGent
            </p>

            <div className="flex justify-center">
              <Link
                href={`/franquicias/calculadora?sector=${sector}`}
                className="group bg-blue-500 hover:bg-blue-600 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 flex items-center gap-3"
              >
                <FaCalculator className="text-2xl" />
                Calcular mi inversión ahora
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <p className="text-center text-white/60 text-sm mt-6">
              ⚡ Cálculo instantáneo • 🔒 Sin compromiso • 📊 Plan de reventa incluido
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

