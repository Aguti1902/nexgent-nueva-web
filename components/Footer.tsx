import Link from 'next/link'
import Image from 'next/image'
import { FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    empresa: [
      { href: '/', label: 'Inicio' },
      { href: '/casos-exito/hello-nails', label: 'Hello Nails' },
      { href: '/contacto', label: 'Contacto' },
      { href: '/demo', label: 'Demo' },
    ],
    legal: [
      { href: '/aviso-legal', label: 'Aviso Legal' },
      { href: '/politica-privacidad', label: 'Privacidad' },
      { href: '/cookies', label: 'Cookies' },
    ],
  }

  const socialLinks = [
    { icon: FaLinkedin, href: 'https://www.linkedin.com/company/nexgentai/', label: 'LinkedIn' },
    { icon: FaInstagram, href: 'https://www.instagram.com/nexgentai', label: 'Instagram' },
    { icon: FaWhatsapp, href: 'https://api.whatsapp.com/send/?phone=34684486647&text&type=phone_number&app_absent=0', label: 'WhatsApp' },
  ]

  return (
    <footer className="bg-black text-white overflow-x-hidden w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Logo y descripción */}
          <div className="md:col-span-2 space-y-5">
            <Link href="/" className="block">
              <Image
                src="/images/LOGO BLANCO.png"
                alt="NexGent"
                width={200}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Construimos CRM a medida para franquicias con IA integrada por WhatsApp y llamadas.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="font-monda text-sm font-bold mb-4 text-white uppercase tracking-wider">Empresa</h3>
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

          {/* Legal */}
          <div>
            <h3 className="font-monda text-sm font-bold mb-4 text-white uppercase tracking-wider">Legal</h3>
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

        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-600 text-xs text-center">
            © {currentYear} NexGent. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
