'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaPhone, FaWhatsapp, FaCheck, FaArrowRight, FaCalculator, FaChartLine, FaUsers, FaRobot } from 'react-icons/fa'

export default function CalculadoraPresupuesto() {
  // Estados
  const [numFranquicias, setNumFranquicias] = useState(50)
  const [agenteWhatsApp, setAgenteWhatsApp] = useState(true)
  const [agenteLlamadas, setAgenteLlamadas] = useState(false)
  const [mensajesPorFranquicia, setMensajesPorFranquicia] = useState(5000)
  const [llamadasPorFranquicia, setLlamadasPorFranquicia] = useState(500)
  const [minutosPorLlamada, setMinutosPorLlamada] = useState(2)

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
    ahorroAnual: 0
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

    setCostes({
      whatsappPorFranquicia: whatsapp,
      llamadasPorFranquicia: llamadas,
      totalPorFranquicia,
      totalMensual,
      descuento,
      totalConDescuento,
      ahorroAnual
    })
  }, [numFranquicias, agenteWhatsApp, agenteLlamadas, mensajesPorFranquicia, llamadasPorFranquicia, minutosPorLlamada])

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
              Calculadora de presupuesto{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                para franquicias
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Configura las necesidades de tu red de franquicias y obtén un presupuesto instantáneo
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

