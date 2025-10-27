import Link from 'next/link'
import Image from 'next/image'
import { FaLinkedin, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    empresa: [
      { href: '/nosotros', label: 'Sobre Nosotros' },
      { href: '/casos-exito', label: 'Casos de Éxito' },
      { href: '/contacto', label: 'Contacto' },
    ],
    servicios: [
      { href: '/servicios#whatsapp', label: 'Atención por WhatsApp' },
      { href: '/servicios#llamadas', label: 'Llamadas Automatizadas' },
      { href: '/servicios#reservas', label: 'Sistema de Reservas' },
    ],
    legal: [
      { href: '/aviso-legal', label: 'Aviso Legal' },
      { href: '/politica-privacidad', label: 'Política de Privacidad' },
      { href: '/cookies', label: 'Política de Cookies' },
    ],
  }

  const socialLinks = [
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaWhatsapp, href: '#', label: 'WhatsApp' },
  ]

  return (
    <footer className="bg-black text-white overflow-x-hidden w-full max-w-full">
      <div className="container-custom px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo y descripción */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <Image 
                src="/images/LOGO BLANCO.png" 
                alt="NexGent" 
                width={240} 
                height={80}
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-base leading-relaxed">
              Transformamos empresas con agentes de inteligencia artificial que automatizan la atención al cliente y aumentan las ventas.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="font-monda text-lg font-bold mb-4 text-white">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="font-monda text-lg font-bold mb-4 text-white">Servicios</h3>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-monda text-lg font-bold mb-4 text-white">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} NexGent. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

