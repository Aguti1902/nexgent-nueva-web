'use client'

import { motion } from 'framer-motion'
import { FaCheckCircle, FaArrowRight, FaCalendarAlt } from 'react-icons/fa'
import Link from 'next/link'
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function UrbanFitnessCaseStudy() {
  const timeline = [
    { phase: 'Semana 1', title: 'Análisis de Leads', description: 'Estudio profundo del flujo de consultas, identificación de puntos de fuga y mapeo de procesos actuales.' },
    { phase: 'Semana 2-3', title: 'Configuración IA', description: 'Desarrollo del agente personalizado, entrenamiento con casos reales y integración con WhatsApp Business.' },
    { phase: 'Semana 4', title: 'Despliegue', description: 'Lanzamiento en los 8 centros, capacitación del equipo y monitoreo intensivo inicial.' },
    { phase: 'Mes 2+', title: 'Escalado', description: 'Optimización continua, expansión de capacidades y crecimiento exponencial de ventas.' },
  ]

  const beforeAfter = [
    { metric: 'Respuestas', before: '60%', after: '100%', improvement: '+40 puntos' },
    { metric: 'Tiempo de respuesta', before: '45min', after: '<2min', improvement: '96% más rápido' },
    { metric: 'Ventas mensuales', before: '€42K', after: '€119.7K', improvement: '+185%' },
    { metric: 'Satisfacción cliente', before: '74%', after: '92%', improvement: '+18 puntos' },
  ]

  // Datos para gráficos
  const salesEvolution = [
    { mes: 'Antes', ventas: 42, respuestas: 60 },
    { mes: 'Mes 1', ventas: 58, respuestas: 80 },
    { mes: 'Mes 2', ventas: 75, respuestas: 95 },
    { mes: 'Mes 3', ventas: 95, respuestas: 100 },
    { mes: 'Mes 4', ventas: 119.7, respuestas: 100 },
  ]

  const responseTimeData = [
    { semana: 'Semana 1', respuestas: 60, tiempoPromedio: 45 },
    { semana: 'Semana 2', respuestas: 85, tiempoPromedio: 15 },
    { semana: 'Semana 3', respuestas: 95, tiempoPromedio: 5 },
    { semana: 'Semana 4', respuestas: 100, tiempoPromedio: 1.8 },
  ]

  const comparisonData = [
    { metrica: 'Ventas (€K)', antes: 42, despues: 119.7 },
    { metrica: 'Respuestas (%)', antes: 60, despues: 100 },
    { metrica: 'Satisfacción (%)', antes: 74, despues: 92 },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <Link href="/casos-exito" className="inline-flex items-center text-gray-600 hover:text-black mb-8 transition-colors">
              <span className="mr-2">←</span> Volver a casos de éxito
            </Link>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative w-48 h-24 mb-6">
                  <Image
                    src="/images/logos/URBAN FITNESS.png"
                    alt="Urban Fitness Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <h1 className="font-monda text-5xl md:text-6xl font-bold text-black mb-6">
                  Caso de éxito: Urban Fitness
                </h1>
                <p className="text-xl text-gray-600 mb-4">
                  Cadena de Gimnasios • 8 centros deportivos
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Cómo Urban Fitness pasó de perder el 40% de consultas a responder el 100% en menos de 2 minutos, 
                  aumentando las ventas un 185% y ahorrando €12K mensuales.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-96 rounded-3xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/images/FOTO URBAN FITNESS.jpg"
                  alt="Urban Fitness - Gimnasio"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Resumen del desafío */}
      <section className="py-16 bg-white">
        <div className="container-custom px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="font-monda text-3xl font-bold text-black mb-6">El Desafío</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Urban Fitness, con 8 gimnasios en operación, <strong>perdía el 40% de las consultas</strong> por 
                  WhatsApp debido a tiempos de respuesta lentos y gestión manual deficiente.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Cada centro recibía entre 50-80 consultas diarias, pero solo el 60% recibía respuesta. 
                  El tiempo promedio de respuesta de 45 minutos significaba leads fríos y ventas perdidas.
                </p>
              </div>
              <div>
                <h2 className="font-monda text-3xl font-bold text-black mb-6">La Solución</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Implementamos un <strong>agente de IA en WhatsApp</strong> que gestiona:
                </p>
                <ul className="space-y-3">
                  {[
                    'Respuestas instantáneas 24/7 a consultas',
                    'Gestión automática de leads y seguimiento',
                    'Reservas de clases y tours guiados',
                    'Upselling inteligente de membresías',
                    'Integración con CRM y sistemas de pago'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Antes vs Después */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container-custom px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-monda text-4xl md:text-5xl font-bold mb-4">Antes vs Después</h2>
              <p className="text-gray-400 text-lg">Transformación medible en todos los KPIs</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {beforeAfter.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 rounded-2xl p-8 border border-white/10"
                >
                  <h3 className="font-bold text-xl mb-6">{item.metric}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Antes</p>
                      <p className="text-3xl font-bold text-red-400">{item.before}</p>
                    </div>
                    <FaArrowRight className="text-2xl text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Después</p>
                      <p className="text-3xl font-bold text-green-400">{item.after}</p>
                    </div>
                  </div>
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 text-center">
                    <p className="text-green-400 font-bold">{item.improvement}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gráficos Interactivos */}
      <section className="py-20 bg-white">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-4">
                Analítica en Tiempo Real
              </h2>
              <p className="text-gray-600 text-lg">Seguimiento de todas las métricas clave</p>
            </motion.div>

            {/* Gráfico de Crecimiento de Ventas */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8 shadow-xl border-2 border-blue-200 mb-12"
            >
              <h3 className="font-bold text-2xl text-black mb-6">Evolución de Ventas e Índice de Respuesta</h3>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={salesEvolution}>
                  <defs>
                    <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRespuestas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="mes" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="ventas" 
                    stroke="#3b82f6" 
                    fillOpacity={1}
                    fill="url(#colorVentas)"
                    name="Ventas (€K)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="respuestas" 
                    stroke="#10b981" 
                    fillOpacity={1}
                    fill="url(#colorRespuestas)"
                    name="Respuestas (%)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Tiempo de Respuesta */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-xl border border-gray-200"
              >
                <h3 className="font-bold text-xl text-black mb-6">Tiempo de Respuesta (minutos)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={responseTimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="semana" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="tiempoPromedio" 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      name="Tiempo Promedio"
                      dot={{ fill: '#ef4444', r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-bold text-center">
                    Reducción del 96% en tiempo de respuesta
                  </p>
                </div>
              </motion.div>

              {/* Comparativa General */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-xl border border-gray-200"
              >
                <h3 className="font-bold text-xl text-black mb-6">Impacto Global</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={comparisonData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" stroke="#6b7280" />
                    <YAxis dataKey="metrica" type="category" stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                    />
                    <Legend />
                    <Bar dataKey="antes" fill="#ef4444" name="Antes" radius={[0, 8, 8, 0]} />
                    <Bar dataKey="despues" fill="#10b981" name="Después" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 font-bold text-center">
                    €12K ahorro mensual en costes operativos
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Cronología */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-4">
                Cronología del Proyecto
              </h2>
              <p className="text-gray-600 text-lg">4 semanas para transformar el negocio</p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300" />
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-20"
                  >
                    <div className="absolute left-0 w-16 h-16 bg-black text-white rounded-full flex items-center justify-center font-bold">
                      <FaCalendarAlt className="text-2xl" />
                    </div>
                    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-bold">
                          {item.phase}
                        </span>
                      </div>
                      <h3 className="font-monda text-2xl font-bold text-black mb-3">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-black text-white">
        <div className="container-custom px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-monda text-4xl md:text-5xl font-bold mb-6">
              ¿Quieres duplicar tus ventas?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Agenda una demo y descubre cómo automatizar tu gimnasio como Urban Fitness
            </p>
            <Link
              href="/contacto"
              className="inline-block bg-white text-black font-bold px-12 py-5 rounded-full text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl"
            >
              Solicita tu demo gratuita
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

