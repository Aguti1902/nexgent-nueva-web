'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaPhone, FaWhatsapp, FaCheck, FaArrowRight, FaCalculator, FaChartLine, FaUsers, FaRobot, FaClock, FaTrophy, FaMoneyBillWave, FaChartBar, FaTimes, FaHeadset, FaCalendarCheck } from 'react-icons/fa'
import InformeDetallado from '@/components/franquicias/InformeDetallado'

// Configuración por sector
const sectorConfig = {
  'estetica-belleza': {
    nombre: 'Estética y Belleza',
    impacto: {
      reduccionNoShows: 68,
      aumentoCitas: 45,
      ahorroHoras: 25,
      aumentoIngresos: 32
    },
    descripcion: 'tus centros de estética y belleza'
  },
  'clinicas-dentales': {
    nombre: 'Clínicas Dentales',
    impacto: {
      reduccionNoShows: 78,
      aumentoCitas: 52,
      ahorroHoras: 30,
      aumentoIngresos: 41
    },
    descripcion: 'tu red de clínicas dentales'
  },
  'restauracion': {
    nombre: 'Restauración',
    impacto: {
      reduccionNoShows: 55,
      aumentoCitas: 35,
      ahorroHoras: 22,
      aumentoIngresos: 28
    },
    descripcion: 'tu cadena de restaurantes'
  },
  'gimnasios-fitness': {
    nombre: 'Gimnasios y Fitness',
    impacto: {
      reduccionNoShows: 62,
      aumentoCitas: 48,
      ahorroHoras: 28,
      aumentoIngresos: 37
    },
    descripcion: 'tu red de gimnasios'
  },
  'inmobiliarias': {
    nombre: 'Inmobiliarias',
    impacto: {
      reduccionNoShows: 55,
      aumentoCitas: 65,
      ahorroHoras: 32,
      aumentoIngresos: 55
    },
    descripcion: 'tu red inmobiliaria'
  }
}

export default function CalculadoraPresupuesto() {
  const searchParams = useSearchParams()
  const sectorParam = searchParams?.get('sector') as keyof typeof sectorConfig | null
  const sector = sectorParam && sectorConfig[sectorParam] ? sectorParam : 'estetica-belleza'
  const sectorData = sectorConfig[sector]

  // Estados
  const [numFranquicias, setNumFranquicias] = useState(50)
  const [agenteWhatsApp, setAgenteWhatsApp] = useState(true)
  const [agenteLlamadas, setAgenteLlamadas] = useState(false)
  const [mensajesPorFranquicia, setMensajesPorFranquicia] = useState(5000)
  const [llamadasPorFranquicia, setLlamadasPorFranquicia] = useState(500)
  const [minutosPorLlamada, setMinutosPorLlamada] = useState(2)
  const [margenReventa, setMargenReventa] = useState(20) // % de margen para reventa

  // Precios base (en €)
  const PRECIO_BASE_FRANQUICIA = 0 // Sin base, solo por uso
  const PRECIO_MENSAJE = 0.01 // € por mensaje (1 céntimo)
  const PRECIO_LLAMADA_BASE = 0.05 // € por llamada (5 céntimos)
  const PRECIO_MINUTO = 0.05 // € por minuto (5 céntimos)

  // Descuentos por volumen de franquicias
  const getDescuentoVolumen = (num: number) => {
    if (num >= 500) return 0.30 // 30% descuento
    if (num >= 200) return 0.20 // 20% descuento
    if (num >= 100) return 0.15 // 15% descuento
    if (num >= 50) return 0.10 // 10% descuento
    return 0
  }

  // Cálculos
  const [costes, setCostes] = useState({
    whatsappPorFranquicia: 0,
    llamadasPorFranquicia: 0,
    totalPorFranquicia: 0,
    totalMensual: 0,
    descuento: 0,
    totalConDescuento: 0,
    ahorroAnual: 0,
    precioReventaFranquicia: 0,
    ingresoMensualReventa: 0,
    ingresoAnualReventa: 0
  })

  useEffect(() => {
    // Coste WhatsApp por franquicia
    const whatsapp = agenteWhatsApp ? mensajesPorFranquicia * PRECIO_MENSAJE : 0

    // Coste llamadas por franquicia
    const llamadas = agenteLlamadas 
      ? (llamadasPorFranquicia * PRECIO_LLAMADA_BASE) + (llamadasPorFranquicia * minutosPorLlamada * PRECIO_MINUTO)
      : 0

    // Total por franquicia
    const totalPorFranquicia = whatsapp + llamadas

    // Total mensual sin descuento
    const totalMensual = totalPorFranquicia * numFranquicias

    // Descuento por volumen
    const porcentajeDescuento = getDescuentoVolumen(numFranquicias)
    const descuento = totalMensual * porcentajeDescuento

    // Total con descuento
    const totalConDescuento = totalMensual - descuento

    // Ahorro anual
    const ahorroAnual = descuento * 12

    // Cálculos de reventa
    const precioReventaFranquicia = totalPorFranquicia * (1 + margenReventa / 100)
    const ingresoMensualReventa = (precioReventaFranquicia - totalPorFranquicia) * numFranquicias
    const ingresoAnualReventa = ingresoMensualReventa * 12

    setCostes({
      whatsappPorFranquicia: whatsapp,
      llamadasPorFranquicia: llamadas,
      totalPorFranquicia,
      totalMensual,
      descuento,
      totalConDescuento,
      ahorroAnual,
      precioReventaFranquicia,
      ingresoMensualReventa,
      ingresoAnualReventa
    })
  }, [numFranquicias, agenteWhatsApp, agenteLlamadas, mensajesPorFranquicia, llamadasPorFranquicia, minutosPorLlamada, margenReventa])

  const descuentoPorcentaje = getDescuentoVolumen(numFranquicias) * 100

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FaCalculator />
              Calcula tu presupuesto personalizado
            </div>
            <h1 className="font-monda text-5xl lg:text-6xl font-bold text-black mb-6">
              Calculadora para{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {sectorData.nombre}
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Descubre cuánto costaría automatizar {sectorData.descripcion} y cuánto vas a ganar con NexGent
            </p>
            <p className="text-sm text-gray-500 italic">
              * Precios orientativos. Contacta con nosotros para un presupuesto definitivo
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculadora */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Panel de Configuración */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Número de franquicias */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FaUsers className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-black">Número de franquicias</h3>
                      <p className="text-sm text-gray-500">Mínimo 20, máximo 2000</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">{numFranquicias}</div>
                </div>
                <input
                  type="range"
                  min="20"
                  max="2000"
                  step="10"
                  value={numFranquicias}
                  onChange={(e) => setNumFranquicias(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>20</span>
                  <span>1000</span>
                  <span>2000</span>
                </div>
                {descuentoPorcentaje > 0 && (
                  <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-700 font-semibold">
                      🎉 ¡Descuento por volumen: {descuentoPorcentaje}%!
                    </p>
                  </div>
                )}
              </div>

              {/* Tipo de agentes */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="font-bold text-lg text-black mb-6 flex items-center gap-2">
                  <FaRobot className="text-purple-600" />
                  Tipo de agentes de IA
                </h3>
                <div className="space-y-4">
                  {/* WhatsApp */}
                  <div
                    onClick={() => setAgenteWhatsApp(!agenteWhatsApp)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      agenteWhatsApp
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          agenteWhatsApp ? 'bg-green-500' : 'bg-gray-200'
                        }`}>
                          <FaWhatsapp className={`text-xl ${agenteWhatsApp ? 'text-white' : 'text-gray-400'}`} />
                        </div>
                        <div>
                          <p className="font-semibold text-black">Agente WhatsApp</p>
                          <p className="text-sm text-gray-600">Atención por mensajería</p>
                        </div>
                      </div>
                      {agenteWhatsApp && <FaCheck className="text-green-500 text-xl" />}
                    </div>
                  </div>

                  {/* Llamadas */}
                  <div
                    onClick={() => setAgenteLlamadas(!agenteLlamadas)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      agenteLlamadas
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          agenteLlamadas ? 'bg-blue-500' : 'bg-gray-200'
                        }`}>
                          <FaPhone className={`text-xl ${agenteLlamadas ? 'text-white' : 'text-gray-400'}`} />
                        </div>
                        <div>
                          <p className="font-semibold text-black">Agente de Llamadas</p>
                          <p className="text-sm text-gray-600">Atención telefónica con IA</p>
                        </div>
                      </div>
                      {agenteLlamadas && <FaCheck className="text-blue-500 text-xl" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Configuración WhatsApp */}
              {agenteWhatsApp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-green-200"
                >
                  <h3 className="font-bold text-lg text-black mb-4 flex items-center gap-2">
                    <FaWhatsapp className="text-green-500" />
                    Mensajes WhatsApp por franquicia/mes
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">Mensajes mensuales:</span>
                    <span className="text-2xl font-bold text-green-600">{mensajesPorFranquicia.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="100000"
                    step="500"
                    value={mensajesPorFranquicia}
                    onChange={(e) => setMensajesPorFranquicia(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>500</span>
                    <span>50K</span>
                    <span>100K</span>
                  </div>
                </motion.div>
              )}

              {/* Configuración Llamadas */}
              {agenteLlamadas && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-blue-200 space-y-6"
                >
                  <div>
                    <h3 className="font-bold text-lg text-black mb-4 flex items-center gap-2">
                      <FaPhone className="text-blue-500" />
                      Llamadas por franquicia/mes
                    </h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-600">Llamadas mensuales:</span>
                      <span className="text-2xl font-bold text-blue-600">{llamadasPorFranquicia.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="5000"
                      step="50"
                      value={llamadasPorFranquicia}
                      onChange={(e) => setLlamadasPorFranquicia(parseInt(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>50</span>
                      <span>2,500</span>
                      <span>5,000</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-black mb-4">Duración promedio por llamada</h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-600">Minutos por llamada:</span>
                      <span className="text-2xl font-bold text-blue-600">{minutosPorLlamada} min</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      step="1"
                      value={minutosPorLlamada}
                      onChange={(e) => setMinutosPorLlamada(parseInt(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>1 min</span>
                      <span>8 min</span>
                      <span>15 min</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Panel de Resultados */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Resumen total */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 shadow-2xl text-white sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                  <FaChartLine className="text-3xl" />
                  <h2 className="font-monda text-2xl font-bold">Tu presupuesto</h2>
                </div>

                {/* Desglose por franquicia */}
                <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-6">
                  <p className="text-white/80 text-sm mb-4">Coste por franquicia/mes:</p>
                  <div className="space-y-3">
                    {agenteWhatsApp && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/90">WhatsApp ({mensajesPorFranquicia} mensajes)</span>
                        <span className="font-semibold">{costes.whatsappPorFranquicia.toFixed(2)}€</span>
                      </div>
                    )}
                    {agenteLlamadas && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/90">Llamadas ({llamadasPorFranquicia} × {minutosPorLlamada} min)</span>
                        <span className="font-semibold">{costes.llamadasPorFranquicia.toFixed(2)}€</span>
                      </div>
                    )}
                    <div className="border-t border-white/20 pt-3 mt-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Total por franquicia</span>
                        <span className="text-2xl font-bold">{costes.totalPorFranquicia.toFixed(2)}€</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total mensual */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/90">Total mensual ({numFranquicias} franquicias)</span>
                    <span className="text-xl font-semibold">{costes.totalMensual.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€</span>
                  </div>

                  {descuentoPorcentaje > 0 && (
                    <>
                      <div className="flex items-center justify-between text-green-300">
                        <span>Descuento por volumen ({descuentoPorcentaje}%)</span>
                        <span className="font-semibold">-{costes.descuento.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€</span>
                      </div>
                      <div className="border-t border-white/20 pt-4">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-lg">Total con descuento</span>
                          <span className="text-3xl font-bold">{costes.totalConDescuento.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€</span>
                        </div>
                        <p className="text-xs text-white/70 mt-2">Ahorro anual: {costes.ahorroAnual.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€</p>
                      </div>
                    </>
                  )}

                  {!descuentoPorcentaje && (
                    <div className="border-t border-white/20 pt-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-lg">Total mensual</span>
                        <span className="text-3xl font-bold">{costes.totalMensual.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* CTAs */}
                <div className="mt-8 space-y-3">
                  <Link
                    href="/demo"
                    className="block w-full bg-white text-blue-600 px-6 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all text-center"
                  >
                    Solicitar presupuesto definitivo
                  </Link>
                  <Link
                    href="/franquicias"
                    className="block w-full bg-white/10 backdrop-blur border border-white/20 text-white px-6 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all text-center"
                  >
                    Ver soluciones por sector
                  </Link>
                </div>

                <p className="text-xs text-white/60 text-center mt-6">
                  * Este es un presupuesto orientativo. El precio final puede variar según tus necesidades específicas.
                </p>
              </div>

              {/* Beneficios */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="font-bold text-lg text-black mb-6">Qué incluye el precio</h3>
                <div className="space-y-3">
                  {[
                    'Dashboard centralizado de toda la red',
                    'Integración con tu CRM actual',
                    'Soporte técnico dedicado 24/7',
                    'Actualizaciones automáticas',
                    'Métricas y analíticas en tiempo real',
                    'Despliegue progresivo sin interrupciones',
                    'Formación del equipo incluida'
                  ].map((beneficio, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <FaCheck className="text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{beneficio}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* INFORME DETALLADO DE IMPACTO */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FaChartLine />
              Análisis de Impacto Detallado
            </div>
            <h2 className="font-monda text-4xl lg:text-5xl font-bold text-black mb-4">
              Impacto real en {sectorData.descripcion}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proyecciones basadas en {numFranquicias} franquicias con datos reales de clientes en {sectorData.nombre}
            </p>
          </motion.div>

          {/* Métricas principales */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
            >
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mb-4">
                <FaClock className="text-white text-2xl" />
              </div>
              <div className="text-4xl font-bold text-red-600 mb-2">
                -{sectorData.impacto.reduccionNoShows}%
              </div>
              <p className="text-gray-700 font-semibold mb-1">Reducción No-shows</p>
              <p className="text-sm text-gray-600 mb-3">
                Menos citas perdidas gracias a recordatorios automáticos
              </p>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">Ahorro mensual estimado:</p>
                <p className="text-lg font-bold text-black">
                  {(numFranquicias * 450 * (sectorData.impacto.reduccionNoShows / 100)).toLocaleString('es-ES', { maximumFractionDigits: 0 })}€
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
            >
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                <FaChartLine className="text-white text-2xl" />
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">
                +{sectorData.impacto.aumentoCitas}%
              </div>
              <p className="text-gray-700 font-semibold mb-1">Más citas agendadas</p>
              <p className="text-sm text-gray-600 mb-3">
                Más reservas captadas 24/7 sin intervención humana
              </p>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">Ingresos adicionales/mes:</p>
                <p className="text-lg font-bold text-black">
                  {(numFranquicias * 1200 * (sectorData.impacto.aumentoCitas / 100)).toLocaleString('es-ES', { maximumFractionDigits: 0 })}€
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                <FaClock className="text-white text-2xl" />
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {sectorData.impacto.ahorroHoras}h
              </div>
              <p className="text-gray-700 font-semibold mb-1">Ahorradas/semana</p>
              <p className="text-sm text-gray-600 mb-3">
                Tiempo liberado por franquicia para tareas de valor
              </p>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">Coste laboral ahorrado/mes:</p>
                <p className="text-lg font-bold text-black">
                  {(numFranquicias * sectorData.impacto.ahorroHoras * 4.33 * 15).toLocaleString('es-ES', { maximumFractionDigits: 0 })}€
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
            >
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                <FaMoneyBillWave className="text-white text-2xl" />
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                +{sectorData.impacto.aumentoIngresos}%
              </div>
              <p className="text-gray-700 font-semibold mb-1">Aumento Ingresos</p>
              <p className="text-sm text-gray-600 mb-3">
                Incremento de facturación en los primeros 6 meses
              </p>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">Facturación adicional/mes:</p>
                <p className="text-lg font-bold text-black">
                  {(numFranquicias * 2800 * (sectorData.impacto.aumentoIngresos / 100)).toLocaleString('es-ES', { maximumFractionDigits: 0 })}€
                </p>
              </div>
            </motion.div>
          </div>

          {/* Proyección temporal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-12"
          >
            <h3 className="font-bold text-2xl text-black mb-6 flex items-center gap-3">
              <FaChartBar className="text-blue-600" />
              Proyección de impacto en el tiempo
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Primer trimestre (3 meses)</p>
                <p className="text-3xl font-bold text-blue-600 mb-2">
                  +{Math.round(sectorData.impacto.aumentoIngresos * 0.5)}%
                </p>
                <p className="text-xs text-gray-500">Fase de adopción y aprendizaje</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Segundo trimestre (6 meses)</p>
                <p className="text-3xl font-bold text-green-600 mb-2">
                  +{sectorData.impacto.aumentoIngresos}%
                </p>
                <p className="text-xs text-gray-500">Rendimiento óptimo alcanzado</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Primer año (12 meses)</p>
                <p className="text-3xl font-bold text-purple-600 mb-2">
                  +{Math.round(sectorData.impacto.aumentoIngresos * 1.4)}%
                </p>
                <p className="text-xs text-gray-500">Con optimizaciones continuas</p>
              </div>
            </div>

            {/* Gráfico de barras visual */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Mes 1-3: Implementación</span>
                  <span className="text-sm font-bold text-blue-600">
                    +{(numFranquicias * 1400 * (sectorData.impacto.aumentoIngresos * 0.5 / 100)).toLocaleString('es-ES', { maximumFractionDigits: 0 })}€/mes
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${50}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Mes 4-6: Optimización</span>
                  <span className="text-sm font-bold text-green-600">
                    +{(numFranquicias * 2800 * (sectorData.impacto.aumentoIngresos / 100)).toLocaleString('es-ES', { maximumFractionDigits: 0 })}€/mes
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `100%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Mes 7-12: Máximo rendimiento</span>
                  <span className="text-sm font-bold text-purple-600">
                    +{(numFranquicias * 2800 * (sectorData.impacto.aumentoIngresos * 1.4 / 100)).toLocaleString('es-ES', { maximumFractionDigits: 0 })}€/mes
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-purple-400 to-purple-600 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(sectorData.impacto.aumentoIngresos * 1.4, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Comparativa Antes vs Después */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl p-8 shadow-2xl mb-12"
          >
            <h3 className="font-bold text-2xl mb-8 text-center">
              Comparativa: Tu red SIN NexGent vs CON NexGent
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Sin NexGent */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <FaTimes className="text-red-500 text-2xl" />
                  <h4 className="font-bold text-xl">Sin automatización</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-white/90">
                      <strong>{Math.round(numFranquicias * 0.3)}</strong> franquicias pierden llamadas diariamente
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-white/90">
                      <strong>{Math.round(numFranquicias * 15)}</strong> horas/día perdidas en tareas repetitivas
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-white/90">
                      <strong>{sectorData.impacto.reduccionNoShows}%</strong> de no-shows por falta de recordatorios
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-white/90">
                      Atención solo en horario laboral (9-20h)
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-white/90">
                      Equipos saturados = peor experiencia cliente
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-white/90">
                      Sin datos centralizados ni métricas unificadas
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-red-500/30">
                  <p className="text-xs text-white/60 mb-2">Pérdidas mensuales estimadas:</p>
                  <p className="text-3xl font-bold text-red-400">
                    -{(numFranquicias * 850).toLocaleString('es-ES')}€
                  </p>
                </div>
              </div>

              {/* Con NexGent */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <FaCheck className="text-green-500 text-2xl" />
                  <h4 className="font-bold text-xl">Con NexGent activo</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-white/90">
                      <strong>100%</strong> de consultas atendidas al instante
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-white/90">
                      <strong>{sectorData.impacto.ahorroHoras * numFranquicias}</strong> horas/semana liberadas para vender
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-white/90">
                      <strong>{100 - sectorData.impacto.reduccionNoShows}%</strong> menos no-shows con recordatorios IA
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-white/90">
                      Atención 24/7/365 sin coste adicional
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-white/90">
                      Equipo enfocado en tareas de alto valor
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-white/90">
                      Dashboard centralizado con BI en tiempo real
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-green-500/30">
                  <p className="text-xs text-white/60 mb-2">Beneficio neto mensual:</p>
                  <p className="text-3xl font-bold text-green-400">
                    +{(numFranquicias * 2100).toLocaleString('es-ES')}€
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center p-6 bg-white/5 rounded-xl border border-white/10">
              <p className="text-sm text-white/70 mb-2">Diferencia total mensual para tu red:</p>
              <p className="text-5xl font-bold text-green-400 mb-2">
                +{(numFranquicias * 2950).toLocaleString('es-ES')}€
              </p>
              <p className="text-xl text-white/80">
                = {(numFranquicias * 2950 * 12).toLocaleString('es-ES')}€ al año
              </p>
            </div>
          </motion.div>

          {/* ROI Detallado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
          >
            <h3 className="font-bold text-2xl text-black mb-6 flex items-center gap-3">
              <FaMoneyBillWave className="text-green-600" />
              Análisis de Retorno de Inversión (ROI)
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Inversión mensual NexGent</p>
                <p className="text-3xl font-bold text-blue-600 mb-1">
                  {costes.totalConDescuento.toLocaleString('es-ES', { maximumFractionDigits: 0 })}€
                </p>
                <p className="text-xs text-gray-500">Para {numFranquicias} franquicias</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Beneficio generado/mes</p>
                <p className="text-3xl font-bold text-green-600 mb-1">
                  {(numFranquicias * 2950).toLocaleString('es-ES')}€
                </p>
                <p className="text-xs text-gray-500">Ahorro + ingresos adicionales</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">ROI mensual</p>
                <p className="text-3xl font-bold text-purple-600 mb-1">
                  {Math.round(((numFranquicias * 2950) / (costes.totalConDescuento || 1)) * 100)}%
                </p>
                <p className="text-xs text-gray-500">Retorno sobre inversión</p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/90 mb-1">Recuperas tu inversión en:</p>
                  <p className="text-4xl font-bold">
                    {Math.max(1, Math.round((costes.totalConDescuento / (numFranquicias * 2950)) * 30))} días
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/90 mb-1">Beneficio neto anual:</p>
                  <p className="text-3xl font-bold">
                    {((numFranquicias * 2950 * 12) - (costes.totalConDescuento * 12)).toLocaleString('es-ES', { maximumFractionDigits: 0 })}€
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">💡 Ahorro en costes laborales:</p>
                <p className="text-xl font-bold text-black">
                  {(numFranquicias * sectorData.impacto.ahorroHoras * 4.33 * 15).toLocaleString('es-ES', { maximumFractionDigits: 0 })}€/mes
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">💡 Ingresos adicionales capturados:</p>
                <p className="text-xl font-bold text-black">
                  {(numFranquicias * 1650).toLocaleString('es-ES', { maximumFractionDigits: 0 })}€/mes
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DESGLOSE POR ÁREAS DE IMPACTO */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-monda text-4xl font-bold text-black mb-4">
              Cómo mejorará cada área de tu franquicia
            </h2>
            <p className="text-xl text-gray-600">
              Impacto detallado por departamento y función
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Atención al Cliente */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center">
                  <FaHeadset className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-black">Atención al Cliente</h3>
                  <p className="text-sm text-gray-600">Experiencia de usuario mejorada</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Tiempo de respuesta</span>
                    <span className="text-lg font-bold text-blue-600">-95%</span>
                  </div>
                  <p className="text-xs text-gray-600">De 8 minutos → 2.3 segundos de media</p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Consultas atendidas</span>
                    <span className="text-lg font-bold text-blue-600">+240%</span>
                  </div>
                  <p className="text-xs text-gray-600">De ~300 a ~1,020 consultas/mes por franquicia</p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Disponibilidad</span>
                    <span className="text-lg font-bold text-blue-600">24/7/365</span>
                  </div>
                  <p className="text-xs text-gray-600">Incluye noches, fines de semana y festivos</p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Satisfacción cliente (NPS)</span>
                    <span className="text-lg font-bold text-blue-600">+32 puntos</span>
                  </div>
                  <p className="text-xs text-gray-600">Respuestas instantáneas = clientes más felices</p>
                </div>
              </div>
            </motion.div>

            {/* Gestión de Citas */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center">
                  <FaCalendarCheck className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-black">Gestión de Citas</h3>
                  <p className="text-sm text-gray-600">Agenda siempre llena</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Tasa de ocupación</span>
                    <span className="text-lg font-bold text-green-600">+{sectorData.impacto.aumentoCitas}%</span>
                  </div>
                  <p className="text-xs text-gray-600">Agendas más llenas sin esfuerzo adicional</p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Cancelaciones last-minute</span>
                    <span className="text-lg font-bold text-green-600">-{Math.round(sectorData.impacto.reduccionNoShows * 0.6)}%</span>
                  </div>
                  <p className="text-xs text-gray-600">Recordatorios automáticos 24h y 2h antes</p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Reagendamientos automáticos</span>
                    <span className="text-lg font-bold text-green-600">100%</span>
                  </div>
                  <p className="text-xs text-gray-600">La IA propone alternativas al instante</p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Confirmaciones</span>
                    <span className="text-lg font-bold text-green-600">+89%</span>
                  </div>
                  <p className="text-xs text-gray-600">Más clientes confirman = menos huecos vacíos</p>
                </div>
              </div>
            </motion.div>

            {/* Eficiencia Operativa */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center">
                  <FaRobot className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-black">Eficiencia Operativa</h3>
                  <p className="text-sm text-gray-600">Equipos más productivos</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Tiempo en llamadas</span>
                    <span className="text-lg font-bold text-purple-600">-{Math.round(sectorData.impacto.ahorroHoras * 2.5)}%</span>
                  </div>
                  <p className="text-xs text-gray-600">{sectorData.impacto.ahorroHoras}h/semana liberadas por local</p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Tareas repetitivas</span>
                    <span className="text-lg font-bold text-purple-600">-82%</span>
                  </div>
                  <p className="text-xs text-gray-600">La IA gestiona FAQs, precios, horarios, etc.</p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Errores en reservas</span>
                    <span className="text-lg font-bold text-purple-600">-94%</span>
                  </div>
                  <p className="text-xs text-gray-600">Integración directa con CRM = 0 errores de transcripción</p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Coste por consulta</span>
                    <span className="text-lg font-bold text-purple-600">0.08€</span>
                  </div>
                  <p className="text-xs text-gray-600">vs. 4.50€ de una recepcionista tradicional</p>
                </div>
              </div>
            </motion.div>

            {/* Ventas y Conversión */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center">
                  <FaChartLine className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-black">Ventas y Conversión</h3>
                  <p className="text-sm text-gray-600">Más ingresos por franquicia</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Tasa de conversión</span>
                    <span className="text-lg font-bold text-orange-600">+{Math.round(sectorData.impacto.aumentoCitas * 0.8)}%</span>
                  </div>
                  <p className="text-xs text-gray-600">De consulta a cita/reserva confirmada</p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Leads capturados fuera de horario</span>
                    <span className="text-lg font-bold text-orange-600">+190%</span>
                  </div>
                  <p className="text-xs text-gray-600">El 35% de consultas llegan fuera del horario laboral</p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Cross-selling automático</span>
                    <span className="text-lg font-bold text-orange-600">+18%</span>
                  </div>
                  <p className="text-xs text-gray-600">La IA sugiere servicios complementarios</p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Ticket medio</span>
                    <span className="text-lg font-bold text-orange-600">+{Math.round(sectorData.impacto.aumentoIngresos * 0.4)}%</span>
                  </div>
                  <p className="text-xs text-gray-600">Upselling inteligente en cada interacción</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Resumen de valor por franquicia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-black to-gray-900 text-white rounded-2xl p-8 shadow-2xl"
          >
            <h3 className="font-bold text-2xl mb-6 text-center">
              💡 Valor generado por franquicia al mes
            </h3>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-sm text-white/70 mb-2">Ahorro en personal</p>
                <p className="text-3xl font-bold text-green-400">
                  {(sectorData.impacto.ahorroHoras * 4.33 * 15).toLocaleString('es-ES', { maximumFractionDigits: 0 })}€
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-white/70 mb-2">Ingresos adicionales</p>
                <p className="text-3xl font-bold text-blue-400">
                  1,650€
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-white/70 mb-2">Citas recuperadas</p>
                <p className="text-3xl font-bold text-purple-400">
                  450€
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-white/70 mb-2">Coste NexGent</p>
                <p className="text-3xl font-bold text-red-400">
                  -{costes.totalPorFranquicia.toFixed(0)}€
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/20 text-center">
              <p className="text-white/80 mb-2">Beneficio neto por franquicia:</p>
              <p className="text-5xl font-bold text-green-400">
                +{(sectorData.impacto.ahorroHoras * 4.33 * 15 + 1650 + 450 - costes.totalPorFranquicia).toLocaleString('es-ES', { maximumFractionDigits: 0 })}€/mes
              </p>
              <p className="text-white/60 text-sm mt-3">
                × {numFranquicias} franquicias = <strong className="text-white">{((sectorData.impacto.ahorroHoras * 4.33 * 15 + 1650 + 450 - costes.totalPorFranquicia) * numFranquicias).toLocaleString('es-ES', { maximumFractionDigits: 0 })}€/mes</strong> para tu red
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PLAN DE REVENTA */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FaTrophy />
              Genera ingresos pasivos con tu red
            </div>
            <h2 className="font-monda text-4xl font-bold mb-4">
              Tú decides cuánto cobrar a tus franquiciados
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Añade un margen sobre el coste de NexGent y convierte la IA en una fuente adicional de ingresos recurrentes para tu central
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Configurador de margen */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8"
            >
              <h3 className="font-bold text-2xl mb-6 flex items-center gap-3">
                <FaChartBar className="text-green-400" />
                Configura tu margen
              </h3>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/80">Margen de reventa:</span>
                  <span className="text-4xl font-bold text-green-400">{margenReventa}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={margenReventa}
                  onChange={(e) => setMargenReventa(parseInt(e.target.value))}
                  className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="flex justify-between text-xs text-white/60 mt-2">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="space-y-4 bg-white/5 rounded-xl p-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-white/70">Tu coste por franquicia:</span>
                  <span className="font-semibold">{costes.totalPorFranquicia.toFixed(2)}€/mes</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-white/70">Precio a franquiciado:</span>
                  <span className="font-semibold text-green-400">{costes.precioReventaFranquicia.toFixed(2)}€/mes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Tu margen por franquicia:</span>
                  <span className="font-bold text-xl text-green-400">
                    {(costes.precioReventaFranquicia - costes.totalPorFranquicia).toFixed(2)}€/mes
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Proyección de ingresos */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 shadow-2xl"
            >
              <h3 className="font-bold text-2xl mb-2 flex items-center gap-3">
                <FaMoneyBillWave />
                Tus ingresos pasivos
              </h3>
              <p className="text-white/90 text-sm mb-8">
                Con {numFranquicias} franquicias y {margenReventa}% de margen
              </p>

              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <p className="text-white/80 text-sm mb-2">Ingresos mensuales recurrentes:</p>
                  <p className="text-5xl font-bold">
                    {costes.ingresoMensualReventa.toLocaleString('es-ES', { minimumFractionDigits: 0 })}€
                  </p>
                  <p className="text-white/70 text-xs mt-2">
                    = {(costes.precioReventaFranquicia - costes.totalPorFranquicia).toFixed(2)}€ × {numFranquicias} franquicias
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <p className="text-white/80 text-sm mb-2">Ingresos anuales proyectados:</p>
                  <p className="text-4xl font-bold">
                    {costes.ingresoAnualReventa.toLocaleString('es-ES', { minimumFractionDigits: 0 })}€
                  </p>
                  <p className="text-white/70 text-xs mt-2">
                    Ingresos 100% pasivos sin gestión operativa
                  </p>
                </div>

                <div className="bg-black/30 rounded-xl p-4 border border-white/20">
                  <p className="text-xs text-white/70 mb-2">💡 Consejo:</p>
                  <p className="text-sm">
                    La mayoría de franquicias cobran entre 15-30% de margen. Así cubres soporte y generas ingresos adicionales.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-white/60 text-sm max-w-2xl mx-auto">
              <strong className="text-white">Nota:</strong> El precio que cobres a tus franquiciados es completamente flexible. 
              Muchas centrales incluyen soporte, formación y consultoría en el precio final, justificando márgenes más altos.
            </p>
          </div>
        </div>
      </section>

      {/* INFORME DETALLADO */}
      <InformeDetallado
        sector={sector}
        numFranquicias={numFranquicias}
        costes={costes}
        mensajesPorFranquicia={mensajesPorFranquicia}
        llamadasPorFranquicia={llamadasPorFranquicia}
        minutosPorLlamada={minutosPorLlamada}
        impacto={sectorData.impacto}
        agenteWhatsApp={agenteWhatsApp}
        agenteLlamadas={agenteLlamadas}
      />

      {/* Info adicional */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-monda text-3xl font-bold text-black mb-6">
              ¿Necesitas un presupuesto personalizado?
            </h2>
            <p className="text-gray-600 mb-8">
              Si tu red de franquicias tiene necesidades específicas o quieres discutir opciones personalizadas, nuestro equipo está listo para ayudarte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all"
              >
                Hablar con el equipo
                <FaArrowRight />
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 bg-white text-black border-2 border-gray-200 px-8 py-4 rounded-xl font-semibold hover:border-black transition-all"
              >
                Enviar consulta
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

