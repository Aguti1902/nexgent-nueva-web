'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FaArrowRight, FaCheck, FaTimes, FaRobot, FaChartLine, FaUsers, FaCut, FaTooth, FaUtensils, FaDumbbell, FaHome, FaWhatsapp, FaCalendarCheck, FaClock, FaStar, FaShieldAlt, FaHeadset, FaBolt, FaCalculator } from 'react-icons/fa'

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

  const scrollToSectores = () => {
    document.getElementById('sectores')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero POTENTE */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-50 rounded-full blur-3xl opacity-30 -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-blue-200">
              <FaBolt />
              Más de 847 franquicias ya confían en NexGent
            </div>

            <h1 className="font-monda text-5xl lg:text-7xl font-bold text-black mb-6 leading-tight">
              Tu franquicia pierde dinero{' '}
              <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                cada minuto que no automatiza
              </span>
            </h1>

            <p className="text-2xl text-gray-700 mb-4 font-semibold">
              Mientras tus competidores captan clientes 24/7 con IA, tú pierdes reservas porque nadie responde.
            </p>

            <p className="text-xl text-gray-600 mb-8">
              NexGent es el sistema de IA que centraliza la atención al cliente de TODAS tus franquicias. Un solo agente que se replica en cada centro, responde al instante y nunca pierde una oportunidad comercial.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo" className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2">
                Ver demo de mi sector ahora
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button onClick={scrollToSectores} className="bg-white text-black border-2 border-gray-300 px-10 py-5 rounded-xl font-bold text-lg hover:border-black transition-all">
                Calcular mi inversión
              </button>
            </div>

            {/* Stats impactantes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: '68%', label: 'Menos no-shows' },
                { value: '24/7', label: 'Atención continua' },
                { value: '847', label: 'Franquicias activas' },
                { value: '2.3seg', label: 'Tiempo de respuesta' }
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-lg">
                  <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Caso de Éxito: Hello Nails */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Imagen */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/FOTO HELLO NAILS.webp"
                  alt="Hello Nails"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur px-4 py-2 rounded-full">
                  <p className="font-bold text-sm">Cliente desde 2024</p>
                </div>
              </div>
            </motion.div>

            {/* Contenido */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/images/logos/HELLO NAILS.png"
                  alt="Hello Nails Logo"
                  width={60}
                  height={60}
                  className="bg-white rounded-xl p-2"
                />
                <div>
                  <h3 className="font-bold text-2xl">Hello Nails</h3>
                  <p className="text-white/80">Cadena de salones de manicura</p>
                </div>
              </div>

              <blockquote className="text-2xl font-semibold mb-6 italic">
                "Pasamos de perder el 40% de las llamadas a tener el 100% de atención automatizada. La ocupación de nuestros salones aumentó un 45% en 3 meses."
              </blockquote>

              <p className="text-white/90 mb-8">
                Antes de NexGent, Hello Nails perdía decenas de reservas cada día porque el equipo estaba atendiendo clientes presenciales. Ahora, su agente de IA responde al instante por WhatsApp, agenda citas y confirma 24h antes. Resultado: más ingresos, menos trabajo manual.
              </p>

              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { value: '+45%', label: 'Ocupación' },
                  { value: '100%', label: 'Respuestas' },
                  { value: '-68%', label: 'No-shows' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-white/80">{stat.label}</p>
                  </div>
                ))}
              </div>

              <Link href="/casos-exito" className="inline-flex items-center gap-2 bg-white text-pink-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all">
                Ver más casos de éxito
                <FaArrowRight />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROBLEMA: Lo que te está costando NO tener esto */}
      <section className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-monda text-4xl lg:text-5xl font-bold text-black mb-6">
              Lo que te está costando NO automatizar
            </h2>
            <p className="text-xl text-gray-600">
              Cada día que pasas sin IA, estás perdiendo dinero real
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: FaTimes, title: 'Llamadas perdidas', desc: 'Un 35% de las llamadas no se atienden en horas punta. Cada llamada perdida es una reserva que se va a la competencia.', coste: '~4,800€/mes perdidos' },
              { icon: FaTimes, title: 'No-shows sin control', desc: 'El 30-40% de clientes no se presenta sin avisar. Cada hueco vacío es dinero que tu franquicia deja de ganar.', coste: '~6,200€/mes perdidos' },
              { icon: FaTimes, title: 'Equipos saturados', desc: 'Tu personal de recepción pasa 4-5 horas/día respondiendo lo mismo. Esas horas podrían dedicarse a vender más.', coste: '~3,500€/mes en costes' },
              { icon: FaTimes, title: 'Sin atención nocturna', desc: 'Tus competidores captan clientes mientras duermes. El 23% de las consultas llegan fuera de horario.', coste: '~5,100€/mes perdidos' },
              { icon: FaTimes, title: 'Cada centro diferente', desc: 'Sin estándar de atención, cada franquicia hace lo que quiere. La experiencia de marca se diluye.', coste: 'Pérdida de valor de marca' },
              { icon: FaTimes, title: 'Sin datos centralizados', desc: 'No tienes visibilidad real de qué pasa en cada centro. Imposible tomar decisiones basadas en datos.', coste: 'Oportunidades perdidas' }
            ].map((problema, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-red-200"
              >
                <problema.icon className="text-4xl text-red-500 mb-4" />
                <h3 className="font-bold text-xl text-black mb-2">{problema.title}</h3>
                <p className="text-gray-600 mb-4">{problema.desc}</p>
                <p className="text-red-600 font-bold">{problema.coste}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-red-600 text-white inline-block px-8 py-6 rounded-2xl shadow-2xl">
              <p className="text-4xl font-bold mb-2">~24,000€/mes</p>
              <p className="text-lg">Pérdida promedio por cada 20 franquicias SIN automatizar</p>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUCIÓN: Qué es NexGent */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-monda text-4xl lg:text-5xl font-bold text-black mb-6">
              La solución que tus competidores ya están usando
            </h2>
            <p className="text-xl text-gray-600">
              NexGent no es "otro chatbot". Es un agente de IA completo diseñado específicamente para franquicias
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: FaRobot,
                title: 'UN agente para toda tu red',
                desc: 'Configurasun agente de IA con tu marca, tus valores y tus procesos. Luego se replica automáticamente en TODAS tus franquicias. Mismo estándar, cero configuración manual por centro.'
              },
              {
                icon: FaWhatsapp,
                title: 'Responde en TODOS los canales',
                desc: 'WhatsApp, llamadas telefónicas, web, redes sociales. Tu cliente pregunta donde quiera, el agente responde al instante. 24/7, sin descansos, sin vacaciones.'
              },
              {
                icon: FaCalendarCheck,
                title: 'Gestiona TODO el ciclo comercial',
                desc: 'No solo responde: agenda citas, confirma, recuerda, reprograma, cualifica leads y registra todo en tu CRM. De pregunta a reserva confirmada, sin intervención humana.'
              },
              {
                icon: FaChartLine,
                title: 'Control total desde la central',
                desc: 'Dashboard unificado con métricas de TODAS tus franquicias. Ve en tiempo real qué centro convierte más, dónde hay problemas y cómo mejorar.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="text-2xl text-white" />
                </div>
                <h3 className="font-bold text-lg text-black mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRUEBA SOCIAL: Stats */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-monda text-4xl lg:text-5xl font-bold mb-6">
              Resultados reales de franquicias reales
            </h2>
            <p className="text-xl text-gray-300">
              No son promesas. Son datos de clientes que ya usan NexGent
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { stat: '+185%', label: 'Aumento en ventas', sector: 'Gimnasios' },
              { stat: '-78%', label: 'Reducción de no-shows', sector: 'Clínicas dentales' },
              { stat: '+62%', label: 'Más captación de leads', sector: 'Inmobiliarias' },
              { stat: '100%', label: 'Respuestas instantáneas', sector: 'Todos los sectores' },
              { stat: '-70%', label: 'Menos carga al equipo', sector: 'Restauración' },
              { stat: '+45%', label: 'Aumento ocupación', sector: 'Salones de belleza' },
              { stat: '2.3seg', label: 'Tiempo de respuesta', sector: 'Promedio' },
              { stat: '24/7', label: 'Disponibilidad', sector: 'Sin excepciones' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all"
              >
                <p className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {item.stat}
                </p>
                <p className="text-lg font-semibold mb-1">{item.label}</p>
                <p className="text-sm text-gray-400">{item.sector}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectores */}
      <section id="sectores" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-monda text-4xl lg:text-5xl font-bold text-black mb-6">
              Solución adaptada a tu sector
            </h2>
            <p className="text-xl text-gray-600">
              El mismo núcleo de IA, personalizado para tu industria
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectores.map((sector, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={sector.href} className="group block bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all h-full">
                  <div className={`bg-gradient-to-r ${sector.gradient} p-6`}>
                    <sector.icon className="text-4xl text-white mb-3" />
                    <h3 className="font-bold text-2xl text-white mb-2">{sector.title}</h3>
                    <p className="text-white/90 text-sm">{sector.descripcion}</p>
                  </div>
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
                      Ver solución completa
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Romper objeciones */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-monda text-4xl lg:text-5xl font-bold text-black mb-6">
              "Sí, pero..."
            </h2>
            <p className="text-xl text-gray-600">
              Respondemos las objeciones que siempre surgen
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: '"¿Y si mis franquiciados no quieren cambiar?"',
                a: 'NexGent no reemplaza a nadie, AYUDA a tu equipo. Después de 2 semanas, tus franquiciados no querrán volver atrás. Se acabó el teléfono sonando sin parar, se acabó perder tiempo en lo mismo de siempre. Hello Nails: 100% de adopción en 3 semanas.'
              },
              {
                q: '"Ya tenemos un CRM, ¿tenemos que cambiarlo?"',
                a: 'NO. NexGent se INTEGRA con tu CRM actual (Flowww, Gesden, CoverManager, etc.). No tiramos nada, mejoramos lo que ya tienes. Setup en menos de 2 semanas sin interrumpir tu operativa.'
              },
              {
                q: '"¿Funciona en mi sector específico?"',
                a: 'Si tu franquicia recibe consultas, agenda citas o capta leads, funciona. Ya trabajamos con estética, clínicas, restaurantes, gimnasios e inmobiliarias. Si no ves tu sector arriba, consúltanos: probablemente ya tengamos experiencia.'
              },
              {
                q: '"¿Y si el agente responde mal?"',
                a: 'El agente aprende de TU información: tus precios, tus servicios, tus políticas. No inventa nada. Y si hay una pregunta que no puede responder, deriva al equipo humano automáticamente. Tasa de respuestas correctas: 94.7%.'
              },
              {
                q: '"Es muy caro para nosotros"',
                a: 'Una recepcionista cuesta ~1,800€/mes. NexGent cuesta una fracción de eso y trabaja 24/7 en TODAS tus franquicias. ROI promedio: 4.2 meses. Además, descuentos de hasta 30% por volumen.'
              },
              {
                q: '"¿Cuánto tarda en estar funcionando?"',
                a: 'Setup inicial: 7-14 días. Despliegue completo en tu red: 4-6 semanas de forma progresiva. Vas controlando el ritmo. No es todo de golpe, es un rollout profesional.'
              }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
              >
                <h3 className="font-bold text-xl text-black mb-4">{faq.q}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final AGRESIVO */}
      <section className="py-20 bg-gradient-to-br from-black to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-monda text-4xl lg:text-6xl font-bold mb-6">
              Cada día que esperas, pierdes dinero
            </h2>
            <p className="text-2xl text-gray-300 mb-4">
              Tus competidores YA están automatizando. Mientras lees esto, están captando clientes que deberían ser tuyos.
            </p>
            <p className="text-xl text-gray-400 mb-8">
              La pregunta no es "¿debería automatizar?". La pregunta es "¿cuánto me está costando NO hacerlo?"
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/demo" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all inline-flex items-center justify-center gap-2">
                Ver demo personalizada ahora
                <FaArrowRight />
              </Link>
              <Link href="/contacto" className="bg-white/10 backdrop-blur border border-white/20 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/20 transition-all text-center">
                Hablar con el equipo
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-green-400" />
                Sin permanencia
              </div>
              <div className="flex items-center gap-2">
                <FaHeadset className="text-blue-400" />
                Soporte 24/7
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-purple-400" />
                Setup en 2 semanas
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

