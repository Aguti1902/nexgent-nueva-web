import { FaCalendarCheck, FaBell, FaSync, FaChartLine, FaMobile, FaCheckCircle, FaUsers, FaClock, FaWhatsapp, FaGlobe, FaRobot, FaFileExport } from 'react-icons/fa'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'Gestión de Reservas con IA | Sistema Automatizado de Citas | NexGent',
  description: 'Sistema automático de reservas y citas integrado con IA. Confirmaciones automáticas, recordatorios inteligentes, gestión de tu agenda 24/7. Reduce no-shows un 75%.',
}

export default function GestionReservasPage() {
  const features = [
    {
      icon: FaCalendarCheck,
      title: 'Reservas automáticas 24/7',
      description: 'Tus clientes pueden reservar en cualquier momento desde cualquier canal: WhatsApp, web, teléfono o Instagram. Sin límites de horario.',
    },
    {
      icon: FaBell,
      title: 'Recordatorios inteligentes multi-canal',
      description: 'Reduce no-shows hasta un 75% con recordatorios personalizados enviados por WhatsApp, SMS y email en los momentos óptimos.',
    },
    {
      icon: FaSync,
      title: 'Sincronización total en tiempo real',
      description: 'Integración bidireccional con Google Calendar, Outlook, Apple Calendar y sistemas de gestión. Actualización instantánea en todos los dispositivos.',
    },
    {
      icon: FaMobile,
      title: 'Reservas multi-canal unificadas',
      description: 'Centraliza todas las reservas en una sola plataforma: WhatsApp, web, llamadas, Instagram, Facebook y más. Gestión unificada.',
    },
    {
      icon: FaUsers,
      title: 'Gestión inteligente de disponibilidad',
      description: 'El sistema calcula automáticamente huecos libres, evita dobles reservas y optimiza tu agenda para maximizar ocupación.',
    },
    {
      icon: FaClock,
      title: 'Reprogramación automática',
      description: 'Los clientes pueden cancelar o reprogramar sus citas automáticamente. El sistema ofrece alternativas disponibles al instante.',
    },
    {
      icon: FaRobot,
      title: 'Confirmaciones automáticas',
      description: 'Envío automático de confirmaciones de reserva con toda la información: fecha, hora, dirección, detalles del servicio y recordatorios.',
    },
    {
      icon: FaFileExport,
      title: 'Reportes y analíticas avanzadas',
      description: 'Dashboard completo con métricas de ocupación, no-shows, cancellations, revenue por servicio y tendencias temporales.',
    },
  ]

  const benefits = [
    'Reducción del 75% en no-shows gracias a recordatorios automáticos multi-canal',
    'Aumento del 40% en reservas mensuales al estar disponible 24/7',
    'Ahorro de 15+ horas semanales en gestión manual de agenda',
    'Integración perfecta con tu calendario y herramientas existentes',
    'Lista de espera automática que rellena huecos por cancelaciones',
    'Personalización de servicios, duraciones y precios por tipo de cita',
    'Sistema de pagos anticipados opcional para garantizar asistencia',
    'Encuestas de satisfacción automáticas post-servicio',
    'Gestión de múltiples empleados y recursos simultáneos',
    'Bloqueo de franjas horarias específicas o días festivos',
    'Exportación de datos para contabilidad y análisis',
    'Notificaciones a tu equipo de nuevas reservas al instante',
  ]

  const useCases = [
    {
      title: 'Salones de Belleza y Peluquerías',
      description: 'Gestiona citas de múltiples servicios (corte, color, manicura, etc.) con diferentes duraciones y empleados. Tus clientes reservan online mientras tú te enfocas en atenderlos.',
      metrics: '+52% más reservas',
    },
    {
      title: 'Clínicas Médicas y Dentales',
      description: 'Optimiza la agenda de doctores, gestiona primeras consultas vs seguimientos, envía recordatorios de citas y reduce ausencias. Integración con historia clínica.',
      metrics: '70% menos ausencias',
    },
    {
      title: 'Restaurantes y Cafeterías',
      description: 'Reservas de mesas con control de capacidad, turnos y zonas. Gestión de grupos grandes, menús especiales y eventos. Todo sincronizado en tiempo real.',
      metrics: '+35% ocupación',
    },
    {
      title: 'Gimnasios y Centros Deportivos',
      description: 'Gestión de clases grupales con límite de plazas, entrenadores personales, canchas deportivas y equipamiento. Pago anticipado y control de aforo.',
      metrics: '95% ocupación de clases',
    },
    {
      title: 'Consultas Profesionales',
      description: 'Abogados, asesores, consultores y coaches pueden automatizar completamente su agenda. Videoconferencias integradas y recordatorios automáticos.',
      metrics: '+60% productividad',
    },
    {
      title: 'Hoteles y Alojamientos',
      description: 'Reservas de habitaciones, check-in/out automatizado, gestión de servicios adicionales (spa, restaurante, tours) todo en una plataforma unificada.',
      metrics: '+45% reservas directas',
    },
  ]

  const stats = [
    { value: '-75%', label: 'Reducción de no-shows' },
    { value: '+40%', label: 'Más reservas mensuales' },
    { value: '15h', label: 'Ahorradas por semana' },
    { value: '24/7', label: 'Disponibilidad total' },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-white to-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-300 rounded-full px-4 py-2 mb-6">
                  <FaCalendarCheck className="text-purple-600" />
                  <span className="text-sm font-semibold text-purple-800">Gestión de Reservas Automática</span>
                </div>
                
                <h1 className="font-monda text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-[1.1]">
                  Tu agenda <span className="text-purple-600">siempre llena</span> sin esfuerzo
                </h1>
                
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  Sistema de <strong>reservas inteligente</strong> que gestiona tu agenda automáticamente las 24 horas. Confirmaciones, recordatorios, reprogramaciones y reducción de no-shows. Todo sin intervención manual.
                </p>

                <div className="bg-white border-l-4 border-purple-500 p-4 rounded-lg mb-8">
                  <p className="text-gray-800 font-medium">
                    <strong className="text-purple-600">El 35%</strong> de tus clientes potenciales intentan reservar fuera de horario. ¿Cuántas reservas estás perdiendo?
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button variant="primary" size="lg" href="/contacto">
                    Solicita una demo gratuita
                  </Button>
                  <Button variant="outline" size="lg" href="/casos-exito">
                    Ver casos de éxito
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>Setup en 24h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>Integración total</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>Sin permanencia</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl">
                  <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-xl">Agenda del día</h3>
                      <span className="text-sm text-gray-500 bg-purple-50 px-3 py-1 rounded-full">Hoy, 27 Oct</span>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { time: '09:00', client: 'María García', service: 'Corte y color', status: 'confirmed', revenue: '85€' },
                        { time: '11:30', client: 'Carlos Ruiz', service: 'Tratamiento facial', status: 'confirmed', revenue: '120€' },
                        { time: '14:00', client: 'Ana López', service: 'Manicura', status: 'pending', revenue: '45€' },
                        { time: '16:30', client: 'Pedro Sánchez', service: 'Masaje', status: 'confirmed', revenue: '90€' },
                        { time: '18:00', client: 'Laura Martín', service: 'Depilación', status: 'confirmed', revenue: '60€' },
                      ].map((appointment, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 transition-all">
                          <div className="flex-shrink-0">
                            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                              <span className="text-xs font-bold text-purple-600">{appointment.time}</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm text-black">{appointment.client}</p>
                            <p className="text-xs text-gray-600">{appointment.service}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-sm font-bold text-purple-600">{appointment.revenue}</span>
                            <div className={`w-2 h-2 rounded-full ${appointment.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total del día:</span>
                      <span className="text-lg font-bold text-purple-600">400€</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-purple-500 text-white rounded-2xl px-6 py-3 shadow-xl">
                  <p className="text-sm font-bold">95% ocupación</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black text-white">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">{stat.value}</p>
                  <p className="text-gray-300 text-sm md:text-base">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">
                Gestión completa y 100% automatizada
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Todo lo que necesitas para optimizar tu agenda, maximizar ingresos y eliminar el trabajo manual
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-purple-500 hover:shadow-xl transition-all duration-300 group">
                  <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 text-2xl mb-4 group-hover:bg-purple-500 group-hover:text-white transition-all">
                    <feature.icon />
                  </div>
                  <h3 className="font-monda text-lg font-bold text-black mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-white">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">
                Perfecto para cualquier negocio con citas
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Miles de negocios ya están automatizando sus reservas y multiplicando su facturación
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-purple-500 transition-all duration-300">
                  <h3 className="font-monda text-xl font-bold text-black mb-4">{useCase.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{useCase.description}</p>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-3">
                    <p className="text-sm font-semibold text-purple-800">{useCase.metrics}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">
                  ¿Qué incluye nuestro sistema de reservas?
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Una plataforma <strong>todo en uno</strong> que elimina completamente la gestión manual de tu agenda y multiplica tu capacidad de reservas.
                </p>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100 hover:border-purple-300 transition-all">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-10 text-white shadow-2xl">
                <h3 className="font-monda text-3xl font-bold mb-8">Caso de éxito real</h3>
                <div className="space-y-8">
                  <div>
                    <p className="text-5xl font-bold text-purple-400 mb-2">+42%</p>
                    <p className="text-gray-300">Aumento en reservas mensuales</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-purple-400 mb-2">75%</p>
                    <p className="text-gray-300">Reducción en no-shows y ausencias</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-purple-400 mb-2">18h</p>
                    <p className="text-gray-300">Ahorradas semanalmente en gestión</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-purple-400 mb-2">€2.8K</p>
                    <p className="text-gray-300">Más de ingresos mensuales</p>
                  </div>
                  <div className="pt-6 border-t border-gray-700">
                    <p className="text-gray-300 italic mb-4 leading-relaxed">
                      "Antes perdíamos el 30% de las citas por no-shows. Desde que usamos el sistema de NexGent, las ausencias bajaron al 8%. Además, ahora recibimos reservas incluso cuando estamos cerrados. Nuestros ingresos han subido un 42% en solo 3 meses."
                    </p>
                    <p className="text-sm text-gray-400 font-semibold">
                      — Sandra Jiménez, Propietaria de Belleza Deluxe (Salón de belleza)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
        
        <div className="container-custom px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-monda text-4xl md:text-6xl font-bold mb-6">
              Optimiza tu agenda hoy mismo
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Únete a las <strong className="text-purple-400">+600 empresas</strong> que ya automatizan sus reservas con IA. Descubre cómo nuestro sistema puede llenar tu agenda automáticamente y aumentar tus ingresos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="white" size="lg" href="/contacto">
                Solicita una demo gratuita
              </Button>
              <Button variant="gray" size="lg" href="/casos-exito">
                Ver más casos de éxito
              </Button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-purple-400" />
                <span>Sin permanencia</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-purple-400" />
                <span>Implementación en 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-purple-400" />
                <span>Soporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
