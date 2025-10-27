import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso Legal - NexGent',
  description: 'Información legal de NexGent',
}

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container-custom max-w-4xl mx-auto px-6">
        <h1 className="font-monda text-5xl md:text-6xl font-bold text-black mb-12">
          Aviso Legal
        </h1>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              1. Datos Identificativos
            </h2>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad
              de la Información y Comercio Electrónico, se informa a los usuarios de los datos identificativos
              de NexGent:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Titular: NexGent Technologies S.L.</li>
              <li>NIF: B-12345678</li>
              <li>Domicilio social: Madrid, España</li>
              <li>Email: hola@nexgent.com</li>
            </ul>
          </section>

          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              2. Condiciones de Uso
            </h2>
            <p>
              El acceso y uso de este sitio web atribuye la condición de usuario y supone la aceptación plena
              de todas las condiciones incluidas en este Aviso Legal. El usuario se compromete a hacer un uso
              adecuado del sitio web y de los contenidos, de conformidad con la legislación aplicable.
            </p>
          </section>

          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              3. Propiedad Intelectual
            </h2>
            <p>
              Todos los contenidos del sitio web, incluyendo textos, imágenes, diseños, logos y códigos,
              son propiedad de NexGent o se usan con el permiso correspondiente. Queda prohibida su
              reproducción, distribución o uso sin autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              4. Limitación de Responsabilidad
            </h2>
            <p>
              NexGent no se hace responsable de los daños y perjuicios que pudieran derivarse del uso
              incorrecto del sitio web por parte del usuario. Tampoco se responsabiliza de interrupciones
              del servicio, errores técnicos o problemas derivados de causas ajenas a su voluntad.
            </p>
          </section>

          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              5. Modificaciones
            </h2>
            <p>
              NexGent se reserva el derecho de modificar el contenido del sitio web y las condiciones
              de este Aviso Legal sin previo aviso.
            </p>
          </section>

          <section>
            <h2 className="font-monda text-2xl font-bold text-black mb-4">
              6. Legislación Aplicable
            </h2>
            <p>
              Las presentes condiciones se rigen por la legislación española. Para cualquier controversia
              derivada del uso del sitio web, las partes se someten a los Juzgados y Tribunales de Madrid.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
