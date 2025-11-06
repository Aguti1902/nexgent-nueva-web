import CreateAgentForm from '@/components/nexibot/CreateAgentForm'
import { FaStar, FaClock, FaShieldAlt } from 'react-icons/fa'

export const metadata = {
  title: 'Crear Agente de IA | Nexibot by NexGent',
  description: 'Describe tu agente ideal en lenguaje natural y Nexibot lo construye automáticamente en 60 segundos. Sin código, sin complicaciones.',
}

export default function CreateAgentPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-black to-purple-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="container-custom px-6 py-24 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-3 inline-flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              <span className="font-medium text-blue-100 text-sm">Tecnología powered by n8n AI</span>
            </div>
          </div>

          <h1 className="font-monda text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Crea tu agente de IA
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              en lenguaje natural
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Describe lo que necesitas como si hablaras con un humano.
            <br />
            Nuestra IA lo construye automáticamente en 60 segundos.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            <div className="flex items-center gap-2 text-gray-300">
              <FaClock className="text-blue-400 text-xl" />
              <span className="text-sm">Setup en 60 segundos</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <FaShieldAlt className="text-green-400 text-xl" />
              <span className="text-sm">100% seguro y privado</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <FaStar className="text-yellow-400 text-xl" />
              <span className="text-sm">Sin conocimientos técnicos</span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <CreateAgentForm />

        {/* Info Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="font-bold text-white mb-2">Precisión IA</h3>
            <p className="text-sm text-gray-300">
              Nuestra IA entiende tu descripción y crea exactamente lo que necesitas
            </p>
          </div>

          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="font-bold text-white mb-2">Velocidad</h3>
            <p className="text-sm text-gray-300">
              De la idea a un agente funcional en menos de 60 segundos
            </p>
          </div>

          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="text-4xl mb-4">🔧</div>
            <h3 className="font-bold text-white mb-2">Personalización</h3>
            <p className="text-sm text-gray-300">
              Cada agente es único y adaptado a tus necesidades específicas
            </p>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm mb-4">
            ¿Necesitas ayuda para describir tu agente?
          </p>
          <a
            href="/recursos/centro-ayuda"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            Ver guía de ejemplos →
          </a>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </main>
  )
}

