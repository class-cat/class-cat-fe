import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground bg-gradient-to-br py-12 text-white">
      <div className="container mx-auto px-6">
        <div className="mb-8 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">
              <span className="text-transparent to-blue-400 bg-gradient-to-r from-primary bg-clip-text">ClassCat</span>
            </h3>
            <p className="text-gray-300 max-w-xs leading-relaxed">Dostarczamy nowoczesne rozwiązania dla osób zainteresowanych swoją pasją.</p>
            <div className="flex space-x-4 pt-2">
              {[
                { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
                { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
                { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" }
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="bg-gray-800 hover:bg-gray-700 flex size-10 items-center justify-center rounded-lg transition-all duration-300 hover:scale-110 hover:text-primary"
                >
                  <social.icon size={18} />
                  <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="relative inline-block text-lg font-[500] text-white">
              <span className="after:mt-1 after:block after:h-1 after:w-full after:rounded-full after:bg-primary after:content-['']">
                Nawigacja
              </span>
            </h3>
            <nav className="flex flex-col space-y-3">
              {[
                { href: "/", label: "Strona główna" },
                { href: "/o-nas", label: "O nas" },
                { href: "/kontakt", label: "Kontakt" }
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-300 group relative w-fit transition-all duration-300 hover:text-white"
                >
                  <span>
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="space-y-6">
            <h3 className="relative inline-block text-lg font-[500] text-white">
              <span className="after:mt-1 after:block after:h-1 after:w-full after:rounded-full after:bg-primary after:content-['']">
                Dokumenty
              </span>
            </h3>
            <nav className="flex flex-col space-y-3">
              {[
                { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
                { href: "/regulamin", label: "Regulamin" },
                { href: "/cookies", label: "Polityka cookies" },
                { href: "/dostepnosc", label: "Dostępność WCAG" }
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-300 group relative w-fit transition-all duration-300 hover:text-white"
                >
                  <span>
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="space-y-6">
            <h3 className="relative inline-block text-lg font-[500] text-white">
              <span className="after:mt-1 after:block after:h-1 after:w-full after:rounded-full after:bg-primary after:content-['']">
                Kontakt
              </span>
            </h3>
            <div className="flex flex-col space-y-4">
              {[
                { icon: MapPin, content: "ul. Przykładowa 123, 00-000 Warszawa" },
                { icon: Phone, content: "+48 123 456 789" },
                { icon: Mail, content: "kontakt@classcat.pl" }
              ].map((contact, index) => (
                <div key={index} className="group flex items-center gap-4">
                  <div className="bg-gray-800 rounded-lg p-2 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary">
                    <contact.icon size={16} />
                  </div>
                  <span className="text-gray-300 transition-colors duration-300 group-hover:text-white">{contact.content}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-gray-800 flex flex-col items-center justify-start border-t pt-8 md:flex-row">
          <p className="text-gray-400 text-sm">© {currentYear} ClassCat. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  )
}