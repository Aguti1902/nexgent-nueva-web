'use client'

import { motion } from 'framer-motion'
import { FaChartLine, FaChartBar, FaMoneyBillWave, FaClock, FaUsers, FaPhone, FaWhatsapp, FaCalendarCheck, FaChartPie, FaTrophy, FaArrowUp, FaArrowDown, FaCheckCircle } from 'react-icons/fa'

interface InformeDetalladoProps {
  sector: string
  numFranquicias: number
  costes: {
    totalPorFranquicia: number
    totalConDescuento: number
    precioReventaFranquicia: number
    ingresoMensualReventa: number
    ingresoAnualReventa: number
  }
  mensajesPorFranquicia: number
  llamadasPorFranquicia: number
  minutosPorLlamada: number
  impacto: {
    reduccionNoShows: number
    aumentoCitas: number
    ahorroHoras: number
    aumentoIngresos: number
  }
  agenteWhatsApp: boolean
  agenteLlamadas: boolean
}

export default function InformeDetallado({
  sector,
  numFranquicias,
  costes,
  mensajesPorFranquicia,
  llamadasPorFranquicia,
  minutosPorLlamada,
  impacto,
  agenteWhatsApp,
  agenteLlamadas
}: InformeDetalladoProps) {
  // Cálculos avanzados
  const citasPerdidasMes = Math.round((llamadasPorFranquicia * 0.35) + (mensajesPorFranquicia * 0.15)) // 35% llamadas + 15% mensajes perdidos
  const citasRecuperadas = Math.round(citasPerdidasMes * (impacto.reduccionNoShows / 100))
  const ticketPromedio = sector === 'inmobiliarias' ? 150 : sector === 'clinicas-dentales' ? 85 : sector === 'restauracion' ? 35 : sector === 'gimnasios-fitness' ? 55 : 45
  const ingresoAdicionalMes = citasRecuperadas * ticketPromedio
  const ingresoAdicionalAno = ingresoAdicionalMes * 12
  
  const horasAhorradasMes = impacto.ahorroHoras * 4 // semanas
  const costoHoraTrabajador = 12 // €/hora promedio
  const ahorroPersonalMes = horasAhorradasMes * costoHoraTrabajador
  const ahorroPersonalAno = ahorroPersonalMes * 12
  
  const inversionNexGent = costes.totalPorFranquicia
  const retornoMensual = ingresoAdicionalMes + ahorroPersonalMes
  const mesesROI = inversionNexGent / retornoMensual
  
  // Proyección 12 meses
  const proyeccion12Meses = Array.from({ length: 12 }, (_, i) => {
    const mes = i + 1
    const factorCrecimiento = 1 + (impacto.aumentoIngresos / 100) * (mes / 12)
    return {
      mes,
      ingresoSinIA: 10000 * mes, // Base hipotética
      ingresoConIA: 10000 * mes * factorCrecimiento,
      diferencia: 10000 * mes * (factorCrecimiento - 1)
    }
  })

  const totalInteraccionesMes = (agenteWhatsApp ? mensajesPorFranquicia : 0) + (agenteLlamadas ? llamadasPorFranquicia : 0)
  const interaccionesAno = totalInteraccionesMes * 12
  const tiempoPromedioInteraccion = agenteLlamadas ? minutosPorLlamada : 2 // minutos
  const horasTotalesAno = (interaccionesAno * tiempoPromedioInteraccion) / 60
  const costoPorInteraccionHumana = 3.5 // € promedio
  const costoPorInteraccionIA = 0.15 // € promedio
  const ahorroTotalInteracciones = interaccionesAno * (costoPorInteraccionHumana - costoPorInteraccionIA)

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <FaChartBar />
            Informe completo de impacto
          </div>
          <h2 className="font-monda text-4xl lg:text-5xl font-bold text-black mb-4">
            Análisis detallado para tu red de {numFranquicias} franquicias
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Proyecciones reales, métricas operativas y ROI financiero de implementar NexGent
          </p>
        </motion.div>

        {/* ROI DESTACADO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-10 text-white shadow-2xl mb-12"
        >
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <FaTrophy className="text-5xl mx-auto mb-4 opacity-80" />
              <p className="text-white/80 text-sm mb-2">ROI estimado en:</p>
              <p className="text-6xl font-bold">{mesesROI.toFixed(1)}</p>
              <p className="text-xl font-semibold mt-2">meses</p>
            </div>
            <div className="text-center border-l border-r border-white/20 py-6">
              <FaMoneyBillWave className="text-5xl mx-auto mb-4 opacity-80" />
              <p className="text-white/80 text-sm mb-2">Retorno mensual por franquicia:</p>
              <p className="text-5xl font-bold">{retornoMensual.toLocaleString('es-ES')}€</p>
              <p className="text-sm mt-2 text-white/80">vs. Inversión de {inversionNexGent.toFixed(0)}€/mes</p>
            </div>
            <div className="text-center">
              <FaChartLine className="text-5xl mx-auto mb-4 opacity-80" />
              <p className="text-white/80 text-sm mb-2">Beneficio anual (red completa):</p>
              <p className="text-5xl font-bold">{(retornoMensual * 12 * numFranquicias).toLocaleString('es-ES')}€</p>
              <p className="text-sm mt-2 text-white/80">Beneficio neto después de inversión</p>
            </div>
          </div>
        </motion.div>

        {/* MÉTRICAS OPERATIVAS */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Citas Recuperadas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <FaCalendarCheck className="text-red-600 text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-black">Citas Perdidas Recuperadas</h3>
                <p className="text-sm text-gray-600">Por franquicia cada mes</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700">Citas perdidas actualmente:</span>
                  <span className="font-bold text-red-600 text-2xl">{citasPerdidasMes}</span>
                </div>
                <div className="h-4 bg-red-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700">Citas recuperadas con IA:</span>
                  <span className="font-bold text-green-600 text-2xl">{citasRecuperadas}</span>
                </div>
                <div className="h-4 bg-green-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all duration-1000" 
                    style={{ width: `${(citasRecuperadas / citasPerdidasMes) * 100}%` }} 
                  />
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-700 mb-1">Ingreso adicional/mes:</p>
                    <p className="text-3xl font-bold text-green-600">
                      {ingresoAdicionalMes.toLocaleString('es-ES')}€
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {citasRecuperadas} citas × {ticketPromedio}€ ticket promedio
                    </p>
                  </div>
                  <FaArrowUp className="text-4xl text-green-500" />
                </div>
                <div className="mt-4 pt-4 border-t border-green-200">
                  <p className="text-sm text-gray-700">Proyección anual:</p>
                  <p className="text-2xl font-bold text-green-700">
                    {ingresoAdicionalAno.toLocaleString('es-ES')}€
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ahorro en Personal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FaClock className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-black">Tiempo y Costes Ahorrados</h3>
                <p className="text-sm text-gray-600">Valorización del tiempo liberado</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <p className="text-sm text-gray-700 mb-2">Horas liberadas por semana:</p>
                <p className="text-5xl font-bold text-blue-600 mb-2">{impacto.ahorroHoras}h</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaCheckCircle className="text-blue-500" />
                  <span>{horasAhorradasMes}h al mes por franquicia</span>
                </div>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-600 mb-1">Coste/hora trabajador</p>
                    <p className="text-2xl font-bold text-gray-700">{costoHoraTrabajador}€</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-600 mb-1">Horas/mes ahorradas</p>
                    <p className="text-2xl font-bold text-gray-700">{horasAhorradasMes}h</p>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <p className="text-sm text-gray-700 mb-2">Ahorro mensual en costes laborales:</p>
                  <p className="text-4xl font-bold text-purple-600 mb-2">
                    {ahorroPersonalMes.toLocaleString('es-ES')}€
                  </p>
                  <div className="pt-3 border-t border-purple-200 mt-3">
                    <p className="text-xs text-gray-600 mb-1">Ahorro anual:</p>
                    <p className="text-2xl font-bold text-purple-700">
                      {ahorroPersonalAno.toLocaleString('es-ES')}€
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded p-4">
                <p className="text-xs text-gray-700 mb-1">💡 Nota importante:</p>
                <p className="text-sm text-gray-800">
                  Este tiempo no significa despedir personal, sino liberarlo para tareas de mayor valor: atención presencial, upselling, experiencia de cliente.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* GRÁFICO DE PROYECCIÓN 12 MESES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-12"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <FaChartLine className="text-white text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-2xl text-black">Proyección de Crecimiento a 12 Meses</h3>
              <p className="text-sm text-gray-600">Comparativa de ingresos con y sin IA (por franquicia)</p>
            </div>
          </div>

          {/* Gráfico de barras */}
          <div className="relative h-80 mb-8">
            <div className="absolute inset-0 flex items-end justify-between gap-2">
              {proyeccion12Meses.map((mes, i) => {
                const maxValue = Math.max(...proyeccion12Meses.map(m => m.ingresoConIA))
                const heightSinIA = (mes.ingresoSinIA / maxValue) * 100
                const heightConIA = (mes.ingresoConIA / maxValue) * 100
                
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex gap-1 items-end h-full">
                      {/* Barra sin IA */}
                      <div className="flex-1 relative group">
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: `${heightSinIA}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.05 }}
                          className="w-full bg-gray-300 rounded-t hover:bg-gray-400 transition-colors relative"
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Sin IA: {(mes.ingresoSinIA / 1000).toFixed(0)}K€
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Barra con IA */}
                      <div className="flex-1 relative group">
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: `${heightConIA}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.05 + 0.1 }}
                          className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t hover:from-blue-600 hover:to-purple-600 transition-colors relative"
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            Con IA: {(mes.ingresoConIA / 1000).toFixed(0)}K€
                          </div>
                        </motion.div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-600 font-medium">M{mes.mes}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Leyenda */}
          <div className="flex items-center justify-center gap-8 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <span className="text-sm text-gray-700">Sin IA</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded" />
              <span className="text-sm text-gray-700">Con NexGent</span>
            </div>
          </div>

          {/* Resumen del gráfico */}
          <div className="grid md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Crecimiento mes 12:</p>
              <p className="text-3xl font-bold text-blue-600">+{impacto.aumentoIngresos}%</p>
            </div>
            <div className="bg-green-50 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Diferencia acumulada:</p>
              <p className="text-3xl font-bold text-green-600">
                {proyeccion12Meses.reduce((acc, m) => acc + m.diferencia, 0).toLocaleString('es-ES', { maximumFractionDigits: 0 })}€
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Promedio mensual extra:</p>
              <p className="text-3xl font-bold text-purple-600">
                {(proyeccion12Meses.reduce((acc, m) => acc + m.diferencia, 0) / 12).toLocaleString('es-ES', { maximumFractionDigits: 0 })}€
              </p>
            </div>
          </div>
        </motion.div>

        {/* ANÁLISIS DE INTERACCIONES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-black to-gray-900 rounded-2xl p-8 shadow-2xl text-white mb-12"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <FaChartPie className="text-white text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-2xl">Análisis de Interacciones</h3>
              <p className="text-sm text-white/70">Volumen y coste por canal</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agenteWhatsApp && (
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
                <FaWhatsapp className="text-4xl text-green-400 mb-4" />
                <p className="text-sm text-white/70 mb-2">Mensajes WhatsApp/mes:</p>
                <p className="text-3xl font-bold mb-2">{mensajesPorFranquicia.toLocaleString()}</p>
                <p className="text-xs text-white/60">Por franquicia</p>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs text-white/70 mb-1">Coste IA vs Humano:</p>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 font-bold">0.01€</span>
                    <span className="text-white/50">vs</span>
                    <span className="text-red-400 line-through">3.50€</span>
                  </div>
                </div>
              </div>
            )}

            {agenteLlamadas && (
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
                <FaPhone className="text-4xl text-blue-400 mb-4" />
                <p className="text-sm text-white/70 mb-2">Llamadas/mes:</p>
                <p className="text-3xl font-bold mb-2">{llamadasPorFranquicia.toLocaleString()}</p>
                <p className="text-xs text-white/60">{minutosPorLlamada} min promedio</p>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs text-white/70 mb-1">Minutos totales:</p>
                  <p className="text-xl font-bold text-blue-400">
                    {(llamadasPorFranquicia * minutosPorLlamada).toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
              <FaUsers className="text-4xl text-purple-400 mb-4" />
              <p className="text-sm text-white/70 mb-2">Interacciones totales/año:</p>
              <p className="text-3xl font-bold mb-2">{interaccionesAno.toLocaleString()}</p>
              <p className="text-xs text-white/60">Toda la red</p>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-white/70 mb-1">Horas equivalentes:</p>
                <p className="text-xl font-bold text-purple-400">
                  {horasTotalesAno.toLocaleString('es-ES', { maximumFractionDigits: 0 })}h
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6">
              <FaMoneyBillWave className="text-4xl mb-4" />
              <p className="text-sm mb-2">Ahorro total interacciones/año:</p>
              <p className="text-4xl font-bold mb-2">
                {ahorroTotalInteracciones.toLocaleString('es-ES', { maximumFractionDigits: 0 })}€
              </p>
              <p className="text-xs opacity-90">IA vs atención humana</p>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-xs mb-1">Por interacción:</p>
                <p className="text-lg font-bold">
                  {((costoPorInteraccionHumana - costoPorInteraccionIA)).toFixed(2)}€ menos
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* COMPARATIVA ANTES/DESPUÉS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
        >
          <h3 className="font-bold text-2xl text-black mb-8 text-center">
            Comparativa Operativa: Antes vs Después de NexGent
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* ANTES */}
            <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
              <div className="flex items-center gap-2 mb-6">
                <FaArrowDown className="text-red-600 text-2xl" />
                <h4 className="font-bold text-xl text-red-700">SIN NEXGENT</h4>
              </div>
              <ul className="space-y-4">
                {[
                  { label: 'Horario de atención', valor: '9:00 - 21:00', icono: FaClock },
                  { label: 'Llamadas perdidas', valor: '35% no respondidas', icono: FaPhone },
                  { label: 'Tiempo de respuesta', valor: '8-15 minutos', icono: FaClock },
                  { label: 'No-shows', valor: `${100 - impacto.reduccionNoShows}% de las citas`, icono: FaCalendarCheck },
                  { label: 'Saturación equipo', valor: 'Alta (80-90%)', icono: FaUsers },
                  { label: 'Coste por interacción', valor: '3.50€ promedio', icono: FaMoneyBillWave }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <item.icono className="text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">{item.label}:</p>
                      <p className="text-sm text-gray-700">{item.valor}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* DESPUÉS */}
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <div className="flex items-center gap-2 mb-6">
                <FaArrowUp className="text-green-600 text-2xl" />
                <h4 className="font-bold text-xl text-green-700">CON NEXGENT</h4>
              </div>
              <ul className="space-y-4">
                {[
                  { label: 'Horario de atención', valor: '24/7 sin excepciones', icono: FaClock },
                  { label: 'Llamadas perdidas', valor: '0% (todas atendidas)', icono: FaPhone },
                  { label: 'Tiempo de respuesta', valor: '2.3 segundos promedio', icono: FaClock },
                  { label: 'No-shows', valor: `${impacto.reduccionNoShows}% menos (recordatorios)`, icono: FaCalendarCheck },
                  { label: 'Saturación equipo', valor: 'Baja (30-40%)', icono: FaUsers },
                  { label: 'Coste por interacción', valor: '0.15€ promedio', icono: FaMoneyBillWave }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <item.icono className="text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">{item.label}:</p>
                      <p className="text-sm text-gray-700">{item.valor}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mejora global */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white text-center">
              <p className="text-sm opacity-90 mb-2">Mejora operativa global estimada:</p>
              <p className="text-5xl font-bold mb-2">+{impacto.aumentoIngresos}%</p>
              <p className="text-sm opacity-90">En eficiencia y capacidad de atención</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

