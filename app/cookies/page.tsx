import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies - NexGent',
  description: 'Política de Cookies de NexGent',
}

export default function PoliticaCookiesPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container-custom max-w-4xl mx-auto px-6">
        <h1 className="font-monda text-5xl md:text-6xl font-bold text-black mb-12">
          Política de Cookies
        </h1>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              1. ¿Qué son las Cookies?
            </h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas
              un sitio web. Se utilizan para hacer que los sitios web funcionen de manera más eficiente,
              proporcionar información a los propietarios del sitio y mejorar la experiencia del usuario.
            </p>
          </section>

          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              2. Tipos de Cookies que Utilizamos
            </h2>
            
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="font-bold text-black mb-2">Cookies Técnicas (Necesarias)</h3>
                <p>
                  Son imprescindibles para el funcionamiento del sitio web. Permiten la navegación y el uso
                  de las diferentes opciones o servicios que existen en ella.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-black mb-2">Cookies de Análisis</h3>
                <p>
                  Nos permiten conocer cómo los usuarios interactúan con nuestro sitio web, identificar
                  errores y medir el rendimiento. Esto nos ayuda a mejorar continuamente nuestros servicios.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-black mb-2">Cookies de Preferencias</h3>
                <p>
                  Permiten que el sitio web recuerde información que cambia la forma en que se comporta o
                  se ve, como tu idioma preferido o la región en la que te encuentras.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-black mb-2">Cookies de Marketing</h3>
                <p>
                  Se utilizan para realizar un seguimiento de los visitantes en los sitios web con la
                  intención de mostrar anuncios relevantes y atractivos para el usuario individual.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              3. Cookies de Terceros
            </h2>
            <p>
              Utilizamos servicios de terceros que pueden instalar cookies en tu dispositivo:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li><strong>Google Analytics:</strong> Para analizar el uso del sitio web</li>
              <li><strong>Google Calendar:</strong> Para la gestión de citas y reservas</li>
              <li><strong>Vercel Analytics:</strong> Para monitorizar el rendimiento del sitio</li>
            </ul>
          </section>

          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              4. Cómo Gestionar las Cookies
            </h2>
            <p>
              Puedes controlar y/o eliminar las cookies como desees. Puedes eliminar todas las cookies que
              ya están en tu dispositivo y configurar la mayoría de los navegadores para evitar que se
              instalen. Sin embargo, si haces esto, es posible que tengas que ajustar manualmente algunas
              preferencias cada vez que visites un sitio y que algunos servicios y funcionalidades no funcionen.
            </p>
            <p className="mt-4">
              Para gestionar las cookies en los navegadores más comunes:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
              <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies</li>
              <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
              <li><strong>Edge:</strong> Configuración → Privacidad → Cookies</li>
            </ul>
          </section>

          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              5. Duración de las Cookies
            </h2>
            <p>
              Las cookies pueden ser de sesión o persistentes:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li><strong>Cookies de sesión:</strong> Se eliminan automáticamente cuando cierras el navegador</li>
              <li><strong>Cookies persistentes:</strong> Permanecen en tu dispositivo durante un período determinado
              o hasta que las elimines manualmente</li>
            </ul>
          </section>

          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              6. Actualizaciones de esta Política
            </h2>
            <p>
              NEXGENT AI SYSTEMS SOCIEDAD LIMITADA puede modificar esta Política de Cookies para adaptarla
              a cambios legislativos o cambios en nuestras prácticas. Te recomendamos revisar esta política
              periódicamente.
            </p>
          </section>

          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              7. Contacto
            </h2>
            <p>
              Si tienes alguna pregunta sobre nuestra Política de Cookies, puedes contactarnos:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li><strong>Email:</strong> info@nexgent.io</li>
              <li><strong>Teléfono:</strong> +34 684 48 66 47</li>
              <li><strong>Dirección:</strong> CALLE JULIO VERNE, 12, PELIGROS (18210), Granada, España</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
