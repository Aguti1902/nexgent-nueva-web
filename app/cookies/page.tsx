import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies - NexGent',
  description: 'Información sobre el uso de cookies en NexGent',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container-custom max-w-4xl mx-auto px-6">
        <h1 className="font-monda text-5xl md:text-6xl font-bold text-black mb-12">
          Política de Cookies
        </h1>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              ¿Qué son las cookies?
            </h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas
              un sitio web. Permiten que el sitio web recuerde tus acciones y preferencias durante un
              período de tiempo.
            </p>
          </section>

          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              ¿Qué cookies utilizamos?
            </h2>
            
            <div className="space-y-6 mt-4">
              <div>
                <h3 className="font-bold text-black text-lg mb-2">Cookies Técnicas (Necesarias)</h3>
                <p>
                  Estas cookies son esenciales para el funcionamiento del sitio web y no pueden ser
                  desactivadas. Incluyen cookies de sesión y de seguridad.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-black text-lg mb-2">Cookies de Análisis</h3>
                <p>
                  Utilizamos Google Analytics para analizar cómo los usuarios interactúan con nuestro
                  sitio web. Esta información nos ayuda a mejorar la experiencia del usuario.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-black text-lg mb-2">Cookies de Marketing</h3>
                <p>
                  Pueden ser utilizadas por nuestros socios publicitarios para crear un perfil de tus
                  intereses y mostrarte anuncios relevantes. Requieren tu consentimiento.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              Cookies de Terceros
            </h2>
            <p>
              Utilizamos servicios de terceros que también establecen cookies:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Google Analytics: Para análisis del tráfico web</li>
              <li>Google Ads: Para remarketing y publicidad</li>
              <li>Meta Pixel: Para seguimiento de conversiones</li>
            </ul>
          </section>

          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              ¿Cómo gestionar las cookies?
            </h2>
            <p>
              Puedes controlar y/o eliminar las cookies según desees. Puedes eliminar todas las cookies
              que ya están en tu dispositivo y configurar la mayoría de los navegadores para evitar
              que se instalen.
            </p>
            <p className="mt-4">
              Ten en cuenta que si eliminas o desactivas las cookies, algunas funciones del sitio web
              pueden no funcionar correctamente.
            </p>
          </section>

          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              Configuración por Navegador
            </h2>
            <p>
              Puedes configurar las cookies en los siguientes navegadores:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Chrome: Configuración &gt; Privacidad y seguridad &gt; Cookies</li>
              <li>Firefox: Opciones &gt; Privacidad y seguridad</li>
              <li>Safari: Preferencias &gt; Privacidad</li>
              <li>Edge: Configuración &gt; Cookies y permisos del sitio</li>
            </ul>
          </section>

          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              Actualizaciones
            </h2>
            <p>
              Esta Política de Cookies puede ser actualizada periódicamente. Te recomendamos revisarla
              regularmente para estar informado sobre cómo utilizamos las cookies.
            </p>
          </section>

          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              Contacto
            </h2>
            <p>
              Si tienes preguntas sobre nuestra Política de Cookies, puedes contactarnos en:
              <br />
              <strong>Email:</strong> hola@nexgent.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
