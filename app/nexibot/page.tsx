import NexibotHero from '@/components/nexibot/NexibotHero'
import AgentCard from '@/components/nexibot/AgentCard'
import { agentTemplates } from '@/lib/nexibot/agent-templates'
import { FaMagic, FaRocket, FaChartLine } from 'react-icons/fa'
import Link from 'next/link'

export const metadata = {
  title: 'Nexibot - Crea tu Agente de IA en 60 segundos | NexGent',
  description: 'Construye agentes de IA personalizados sin código. Describe lo que necesitas y Nexibot lo crea automáticamente. 12+ agentes predefinidos disponibles.',
}

export default function NexibotPage() {
  return (
    <main className="min-h-screen">
      <NexibotHero />

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="container-custom px-6">
          <div className="text-center mb-16">
            <h2 className="font-monda text-4xl lg:text-5xl font-bold text-black mb-6">
              Cómo funciona Nexibot
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Crea agentes de IA potentes en 3 simples pasos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaMagic className="text-3xl text-white" />
              </div>
              <h3 className="font-monda text-2xl font-bold text-black mb-4">
                1. Describe tu agente
              </h3>
              <p className="text-gray-600">
                Escribe en lenguaje natural qué quieres que haga tu agente: "Quiero un bot que responda WhatsApp y agende citas"
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaRocket className="text-3xl text-white" />
              </div>
              <h3 className="font-monda text-2xl font-bold text-black mb-4">
                2. Nexibot lo construye
              </h3>
              <p className="text-gray-600">
                Nuestra IA genera automáticamente el workflow completo con todas las integraciones necesarias en 60 segundos
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaChartLine className="text-3xl text-white" />
              </div>
              <h3 className="font-monda text-2xl font-bold text-black mb-4">
                3. Activa y monitorea
              </h3>
              <p className="text-gray-600">
                Activa tu agente con un clic y monitorea su rendimiento en tiempo real desde tu dashboard personalizado
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/nexibot/create"
              className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all duration-300 hover:shadow-xl"
            >
              Crear mi primer agente gratis
            </Link>
          </div>
        </div>
      </section>

      {/* Catálogo de agentes */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom px-6">
          <div className="text-center mb-16">
            <h2 className="font-monda text-4xl lg:text-5xl font-bold text-black mb-6">
              Catálogo de agentes predefinidos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              ¿No quieres crear desde cero? Elige uno de nuestros agentes preconstruidos
              y actívalo en minutos
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              {['Todos', 'Atención Cliente', 'Ventas', 'Operaciones', 'Marketing'].map((filter) => (
                <button
                  key={filter}
                  className="px-6 py-2 rounded-full border-2 border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-300 font-semibold"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {agentTemplates.map((agent, index) => (
              <AgentCard key={agent.id} agent={agent} index={index} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/nexibot/catalog"
              className="inline-block border-2 border-black text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-black hover:text-white transition-all duration-300"
            >
              Ver todos los agentes →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-950 via-black to-purple-950 text-white">
        <div className="container-custom px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-monda text-4xl lg:text-5xl font-bold mb-6">
              ¿Listo para automatizar tu negocio?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Únete a las empresas que ya están usando Nexibot para escalar sin límites
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/nexibot/create"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                Empezar gratis
              </Link>
              
              <Link
                href="/demo"
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300"
              >
                Agendar demo
              </Link>
            </div>

            <p className="text-gray-400 text-sm mt-8">
              Sin tarjeta de crédito • Setup en 60 segundos • Cancela cuando quieras
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

