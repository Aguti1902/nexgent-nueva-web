'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaArrowRight, FaCheck, FaRobot, FaChartLine, FaUsers, FaCut, FaTooth, FaUtensils, FaDumbbell, FaHome, FaWhatsapp, FaCalendarCheck } from 'react-icons/fa'

export default function FranquiciasHub() {
  const sectores = [
    {
      icon: FaCut,
      title: 'Estética y Belleza',
      descripcion: 'Centros de estética, peluquerías, spas',
      beneficios: [
        'Gestión automática de citas en todos los centros',
        'Recordatorios que reducen el no-show un 68%',
        'Atención 24/7 sin saturar a tu equipo'
      ],
      href: '/franquicias/estetica-belleza',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: FaTooth,
      title: 'Clínicas Dentales',
      descripcion: 'Cadenas de clínicas dentales',
      beneficios: [
        'Citas automáticas en todas tus clínicas',
        'Confirmaciones y recordatorios inteligentes',
        'Integración directa con Gesden'
      ],
      href: '/franquicias/clinicas-dentales',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FaUtensils,
      title: 'Restauración',
      descripcion: 'Cadenas de restaurantes y hostelería',
      beneficios: [
        'Más reservas sin saturar el teléfono',
        'Gestión centralizada de todos los locales',
        'Responde dudas sobre carta y horarios'
      ],
      href: '/franquicias/restauracion',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: FaDumbbell,
      title: 'Gimnasios y Fitness',
      descripcion: 'Cadenas de gimnasios y centros deportivos',
      beneficios: [
        'Reservas de clases y entrenamientos',
        'Captación automatizada de nuevos socios',
        'Atención unificada en todos los centros'
      ],
      href: '/franquicias/gimnasios-fitness',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: FaHome,
      title: 'Inmobiliarias',
      descripcion: 'Redes de agencias inmobiliarias',
      beneficios: [
        'Captación y clasificación automática de leads',
        'Agendamiento de visitas en todas las oficinas',
        'Cualificación de clientes antes de asignar'
      ],
      href: '/franquicias/inmobiliarias',
      gradient: 'from-purple-500 to-indigo-500'
    }
  ]

  const crms = [
    { name: 'Flowww', sector: 'Centros de estética y belleza', color: 'pink' },
    { name: 'Style Franquicias', sector: 'Cadenas de peluquería y belleza', color: 'rose' },
    { name: 'Gesden G5 / One', sector: 'Clínicas dentales', color: 'blue' },
    { name: 'CoverManager', sector: 'Cadenas de restauración', color: 'orange' },
    { name: 'Xplor Resamania', sector: 'Cadenas de gimnasios', color: 'green' },
    { name: 'Trainingym', sector: 'Gimnasios y fitness', color: 'emerald' },
    { name: 'Inmovilla', sector: 'Agencias inmobiliarias en red', color: 'purple' },
    { name: 'Optima-CRM', sector: 'Inmobiliarias multi-oficina', color: 'indigo' }
  ]

  const scrollToSectores = () => {
    document.getElementById('sectores')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Principal */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-100 rounded-full blur-3xl opacity-20 -z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenido izquierdo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <FaRobot />
                IA especializada en franquicias
              </div>

              <h1 className="font-monda text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
                La IA que centraliza la atención al cliente de{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  todas tus franquicias
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                NexGent es un agente de IA especializado en franquicias que gestiona reservas, citas y dudas de clientes en todos tus centros, conectado a tu CRM.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={scrollToSectores}
                  className="group bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                >
                  Ver soluciones por sector
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  href="/demo"
                  className="bg-white text-black border-2 border-gray-200 px-8 py-4 rounded-xl font-semibold hover:border-black transition-all text-center"
                >
                  Solicitar demo para mi franquicia
                </Link>
              </div>

              {/* Stats rápidos */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: '24/7', label: 'Atención continua' },
                  { value: '68%', label: 'Menos no-shows' },
                  { value: '100%', label: 'Integrado con tu CRM' }
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-3xl font-bold text-black mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Mockup derecho */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl p-8 border border-gray-800">
                {/* Simulación de dashboard */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <FaRobot className="text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">NexGent Dashboard</p>
                        <p className="text-gray-400 text-sm">Central de franquicia</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-green-500 text-sm font-semibold">Activo</span>
                    </div>
                  </div>

                  {/* Cards de métricas */}
                  {[
                    { icon: FaWhatsapp, label: 'Conversaciones hoy', value: '847', color: 'from-green-500 to-emerald-500' },
                    { icon: FaCalendarCheck, label: 'Citas agendadas', value: '124', color: 'from-blue-500 to-cyan-500' },
                    { icon: FaUsers, label: 'Centros conectados', value: '23', color: 'from-purple-500 to-pink-500' }
                  ].map((metric, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${metric.color} rounded-lg flex items-center justify-center`}>
                            <metric.icon className="text-white text-lg" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">{metric.label}</p>
                            <p className="text-white text-2xl font-bold">{metric.value}</p>
                          </div>
                        </div>
                        <FaChartLine className="text-gray-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decoración flotante */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-2xl opacity-50 animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sección "Qué es NexGent" */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-monda text-4xl font-bold text-black mb-6">
              ¿Qué es NexGent para franquicias?
            </h2>
            <p className="text-xl text-gray-600">
              Un único agente de IA que se adapta a tu marca y se replica en todos tus centros
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FaRobot,
                title: 'Un solo agente diseñado para tu marca',
                desc: 'Configuramos un agente de IA con tu tono, tus valores y tus procesos comerciales.'
              },
              {
                icon: FaUsers,
                title: 'Se replica en todos tus centros',
                desc: 'El mismo estándar de atención en cada franquicia, sin necesidad de formar a cada equipo.'
              },
              {
                icon: FaWhatsapp,
                title: 'Gestiona atención, reservas y dudas',
                desc: 'WhatsApp, llamadas, web. El agente responde, agenda y cualifica en todos los canales.'
              },
              {
                icon: FaChartLine,
                title: 'Control global desde la central',
                desc: 'Métricas unificadas de todos los centros: conversaciones, citas, leads y rendimiento.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="text-2xl text-white" />
                </div>
                <h3 className="font-bold text-lg text-black mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Sectores (MUY IMPORTANTE) */}
      <section id="sectores" className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-monda text-4xl lg:text-5xl font-bold text-black mb-6">
              Soluciones de IA por sector de franquicia
            </h2>
            <p className="text-xl text-gray-600">
              El mismo núcleo de IA, adaptado a la realidad de tu sector
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectores.map((sector, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={sector.href}
                  className="group block bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all h-full"
                >
                  {/* Header con gradiente */}
                  <div className={`bg-gradient-to-r ${sector.gradient} p-6`}>
                    <sector.icon className="text-4xl text-white mb-3" />
                    <h3 className="font-bold text-2xl text-white mb-2">{sector.title}</h3>
                    <p className="text-white/90 text-sm">{sector.descripcion}</p>
                  </div>

                  {/* Contenido */}
                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      {sector.beneficios.map((beneficio, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-gray-700">
                          <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                          <span>{beneficio}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-2 text-black font-semibold group-hover:gap-4 transition-all">
                      Ver solución para este sector
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Integraciones CRM */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-monda text-4xl lg:text-5xl font-bold text-black mb-6">
              Nos integramos con los CRMs que ya usas
            </h2>
            <p className="text-xl text-gray-600">
              Nuestro agente de IA trabaja encima de tu infraestructura actual, sin obligarte a cambiar de software
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {crms.map((crm, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 bg-${crm.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                  <span className={`text-2xl font-bold text-${crm.color}-600`}>
                    {crm.name[0]}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-black mb-2">{crm.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{crm.sector}</p>
                <p className="text-xs text-gray-500 italic">
                  Integración disponible o en estudio
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              ¿No ves tu CRM en la lista?
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              Consúltanos sobre tu caso específico
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-black to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-monda text-4xl lg:text-5xl font-bold mb-6">
              ¿Tu franquicia pertenece a alguno de estos sectores?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Cuéntanos cuántos centros tienes y te preparamos una demo personalizada
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2"
              >
                Solicitar demo para mi franquicia
                <FaArrowRight />
              </Link>
              <Link
                href="/contacto"
                className="bg-white/10 backdrop-blur text-white border border-white/20 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all text-center"
              >
                Hablar con el equipo
              </Link>
            </div>

            <p className="text-sm text-gray-400 mt-6">
              ✓ Sin permanencia · ✓ Integración con tu CRM · ✓ Soporte dedicado
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

