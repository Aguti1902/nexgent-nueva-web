import { FaHotel, FaKey, FaConciergeBell, FaWhatsapp, FaCheckCircle, FaBell, FaUsers, FaClock, FaStar, FaClipboardList, FaHeadset, FaMobileAlt } from 'react-icons/fa'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'IA para Hoteles | Automatización Hotelera | NexGent',
  description: 'Automatiza tu hotel con agentes de IA. Check-in digital, atención 24/7 y servicios personalizados. +95% satisfacción, -70% tiempo check-in.',
}

export default function HotelesPage() {
  return (
    <>
      <section className="py-24 bg-gradient-to-br from-indigo-50 via-white to-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-indigo-100 border border-indigo-300 rounded-full px-4 py-2 mb-6">
                  <FaHotel className="text-indigo-600" />
                  <span className="text-sm font-semibold text-indigo-800">Hoteles</span>
                </div>
                <h1 className="font-monda text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-[1.1]">
                  <span className="text-indigo-600">Experiencia</span> hotelera excepcional con IA
                </h1>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  IA que gestiona check-in digital, atiende huéspedes 24/7 y personaliza servicios automáticamente. <strong>+95% satisfacción</strong>, -70% tiempo check-in, atención en 15 idiomas.
                </p>
                <div className="bg-white border-l-4 border-indigo-500 p-4 rounded-lg mb-8">
                  <p className="text-gray-800 font-medium">
                    Hoteles con IA aumentan su puntuación en <strong className="text-indigo-600">+1.2 estrellas</strong> en valoraciones y generan €6.8K mensuales extras en servicios.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button variant="primary" size="lg" href="/contacto">
                    Solicita una demo
                  </Button>
                  <Button variant="outline" size="lg" href="/casos-exito">
                    Ver casos de éxito
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  {['15 idiomas', 'Integración PMS', 'Soporte 24/7'].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl">
                  <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white mb-4">
                    <h3 className="font-bold text-xl mb-4">Panel Hotelero - Hoy</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {label: 'Huéspedes activos', value: '142'},
                        {label: 'Check-ins hoy', value: '38'},
                        {label: 'Ocupación', value: '87%'},
                        {label: 'Satisfacción', value: '4.8⭐'},
                      ].map((metric, idx) => (
                        <div key={idx} className="bg-white/10 rounded-lg p-3">
                          <p className="text-xs text-indigo-100">{metric.label}</p>
                          <p className="text-2xl font-bold">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <FaKey className="text-green-600 text-xl mt-1" />
                        <div>
                          <p className="font-bold text-sm text-gray-900">Check-in digital completado</p>
                          <p className="text-xs text-gray-700 mt-1">Familia García - Hab 305 - Check-in en 2 min</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <FaConciergeBell className="text-blue-600 text-xl mt-1" />
                        <div>
                          <p className="font-bold text-sm text-gray-900">Servicio solicitado</p>
                          <p className="text-xs text-gray-700 mt-1">Sr. Martínez pidió toallas extra - En camino</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <FaStar className="text-purple-600 text-xl mt-1" />
                        <div>
                          <p className="font-bold text-sm text-gray-900">Reseña recibida</p>
                          <p className="text-xs text-gray-700 mt-1">Laura P. dejó 5⭐ - "Experiencia impecable"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-indigo-500 text-white rounded-2xl px-6 py-3 shadow-xl">
                  <p className="text-sm font-bold">4.8⭐ satisfacción</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-black text-white">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {value: '+95%', label: 'Satisfacción de huéspedes'},
                {value: '-70%', label: 'Tiempo de check-in'},
                {value: '24/7', label: 'Atención disponible'},
                {value: '+1.2★', label: 'Puntuación online'},
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-indigo-400 mb-2">{stat.value}</p>
                  <p className="text-gray-300 text-sm md:text-base">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Automatización hotelera completa</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">IA diseñada específicamente para el sector hotelero</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {icon: FaKey, title: 'Check-in digital', description: 'Huéspedes completan check-in desde su móvil antes de llegar. Reciben llave digital y acceden sin esperas.'},
                {icon: FaHeadset, title: 'Atención 24/7 multi-idioma', description: 'IA que responde dudas en 15 idiomas por WhatsApp: servicios, restaurantes, horarios, turismo.'},
                {icon: FaConciergeBell, title: 'Servicios bajo demanda', description: 'Huéspedes piden servicios (toallas, room service, late checkout) automáticamente por WhatsApp.'},
                {icon: FaBell, title: 'Notificaciones personalizadas', description: 'Mensajes automáticos de bienvenida, info útil del hotel y recordatorios de checkout.'},
                {icon: FaUsers, title: 'Gestión de reservas', description: 'Confirmaciones automáticas, cambios de fecha, upgrades y solicitudes especiales gestionadas por IA.'},
                {icon: FaClipboardList, title: 'Encuestas automáticas', description: 'Solicitud de feedback durante y post-estancia que mejora servicio y genera reseñas positivas.'},
                {icon: FaMobileAlt, title: 'App del huésped', description: 'App personalizada donde huéspedes acceden a todo: servicios, info, chat con IA, facturas.'},
                {icon: FaStar, title: 'Generación de reseñas', description: 'Sistema automático que pide valoraciones en el momento óptimo, mejorando reputación online.'},
              ].map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-indigo-500 hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 text-2xl mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    <feature.icon />
                  </div>
                  <h3 className="font-monda text-lg font-bold text-black mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">Resultados en hotelería</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {title: 'Mayor satisfacción', description: 'Check-in sin colas, atención inmediata 24/7 en su idioma, servicios bajo demanda. Satisfacción sube de 4.2★ a 4.8★.', impact: '+95% satisfacción'},
                {title: 'Más ingresos', description: 'IA sugiere upgrades, servicios adicionales y experiencias personalizadas en el momento perfecto, aumentando revenue por habitación.', impact: '€6.8K extras/mes'},
                {title: 'Equipo optimizado', description: 'Personal liberado de tareas repetitivas puede enfocarse en experiencia premium. Reduce necesidad de recepcionistas.', impact: '-45% costes operativos'},
              ].map((result, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-indigo-500 transition-all">
                  <h3 className="font-monda text-2xl font-bold text-black mb-4">{result.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{result.description}</p>
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-3">
                    <p className="text-sm font-semibold text-indigo-800">{result.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-monda text-4xl md:text-5xl font-bold text-black mb-6">¿Qué incluye para tu hotel?</h2>
                <p className="text-lg text-gray-600 mb-8">Plataforma completa para hotelería</p>
                <div className="space-y-3">
                  {[
                    'Check-in y check-out digital sin contacto',
                    'Atención IA 24/7 en 15 idiomas',
                    'WhatsApp Business para huéspedes',
                    'App personalizada del huésped',
                    'Gestión automática de servicios',
                    'Integración con tu PMS hotelero',
                    'Sistema de recomendaciones personalizadas',
                    'Encuestas de satisfacción automatizadas',
                    'Generación de reseñas online',
                    'Dashboard con analytics en tiempo real',
                    'Gestión de upsells y upgrades',
                    'Soporte técnico especializado 24/7',
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100 hover:border-indigo-300 transition-all">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-10 text-white shadow-2xl">
                <h3 className="font-monda text-3xl font-bold mb-8">Hotel Boutique Marina</h3>
                <div className="space-y-8">
                  {[
                    {value: '4.9★', label: 'Puntuación en Booking'},
                    {value: '-75%', label: 'Tiempo de check-in'},
                    {value: '€8.2K', label: 'Revenue adicional/mes'},
                    {value: '+180%', label: 'Reseñas positivas'},
                  ].map((stat, idx) => (
                    <div key={idx}>
                      <p className="text-5xl font-bold text-indigo-400 mb-2">{stat.value}</p>
                      <p className="text-gray-300">{stat.label}</p>
                    </div>
                  ))}
                  <div className="pt-6 border-t border-gray-700">
                    <p className="text-gray-300 italic mb-4 leading-relaxed">"Check-in pasó de 15 minutos con cola a 2 minutos digitales. Huéspedes tienen atención 24/7 en su idioma. La puntuación subió de 4.2 a 4.9 estrellas. Los upsells automáticos generan €8.2K extras mensuales. Mejor inversión que hicimos."</p>
                    <p className="text-sm text-gray-400 font-semibold">— Patricia Ruiz, Directora Hotel Boutique Marina</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
        <div className="container-custom px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-monda text-4xl md:text-6xl font-bold mb-6">
              Eleva la experiencia hotelera
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Más de <strong className="text-indigo-400">+190 hoteles</strong> ya ofrecen experiencias excepcionales con IA. Check-in digital, atención 24/7, huéspedes más felices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="white" size="lg" href="/contacto">
                Agenda tu demo gratuita
              </Button>
              <Button variant="gray" size="lg" href="/casos-exito">
                Ver casos reales
              </Button>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
              {['Sin permanencia', 'Setup en 48h', 'Integración PMS'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <FaCheckCircle className="text-indigo-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
