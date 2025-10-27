import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad - NexGent',
  description: 'Política de Privacidad y Protección de Datos de NexGent',
}

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container-custom max-w-4xl mx-auto px-6">
        <h1 className="font-monda text-5xl md:text-6xl font-bold text-black mb-12">
          Política de Privacidad
        </h1>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              1. Responsable del Tratamiento
            </h2>
            <p>
              NexGent Technologies S.L. (en adelante "NexGent") es el responsable del tratamiento de los
              datos personales recogidos a través de este sitio web.
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Email de contacto: info@nexgent.io</li>
              <li>Domicilio: Madrid, España</li>
            </ul>
          </section>

          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              2. Datos que Recogemos
            </h2>
            <p>
              Podemos recoger y tratar los siguientes datos personales:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Nombre y apellidos</li>
              <li>Email</li>
              <li>Teléfono</li>
              <li>Nombre de empresa</li>
              <li>Sector de actividad</li>
              <li>Información proporcionada en formularios de contacto</li>
            </ul>
          </section>

          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              3. Finalidad del Tratamiento
            </h2>
            <p>
              Tus datos personales serán tratados para las siguientes finalidades:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Responder a tus consultas y solicitudes</li>
              <li>Gestionar la prestación de nuestros servicios</li>
              <li>Enviarte información comercial (si has dado tu consentimiento)</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              4. Legitimación
            </h2>
            <p>
              La base legal para el tratamiento de tus datos es:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Tu consentimiento al completar formularios</li>
              <li>La ejecución de un contrato o medidas precontractuales</li>
              <li>El cumplimiento de obligaciones legales</li>
              <li>Nuestro interés legítimo en mejorar nuestros servicios</li>
            </ul>
          </section>

          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              5. Conservación de Datos
            </h2>
            <p>
              Tus datos personales serán conservados durante el tiempo necesario para cumplir con las
              finalidades para las que fueron recogidos, y para cumplir con obligaciones legales.
            </p>
          </section>

          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              6. Tus Derechos
            </h2>
            <p>
              Tienes derecho a:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Acceder a tus datos personales</li>
              <li>Rectificar datos inexactos</li>
              <li>Solicitar la supresión de tus datos</li>
              <li>Solicitar la limitación del tratamiento</li>
              <li>Oponerte al tratamiento</li>
              <li>Solicitar la portabilidad de tus datos</li>
            </ul>
            <p className="mt-4">
              Para ejercer estos derechos, contacta con nosotros en: info@nexgent.io
            </p>
          </section>

          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              7. Seguridad
            </h2>
            <p>
              NexGent ha implementado medidas de seguridad técnicas y organizativas apropiadas para proteger
              tus datos personales contra pérdida, uso indebido o acceso no autorizado.
            </p>
          </section>

          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              8. Modificaciones
            </h2>
            <p>
              NexGent se reserva el derecho de modificar esta Política de Privacidad para adaptarla a
              cambios legislativos o en nuestras prácticas. Te recomendamos revisarla periódicamente.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
