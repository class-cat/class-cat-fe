import Link from "next/link"
import { socialLinks } from "./constants"

export const FooterSocials = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">
        <span className="text-transparent to-blue-400 bg-gradient-to-r from-primary bg-clip-text">
          ClassCat
        </span>
      </h3>
      <p className="text-gray-300 max-w-xs leading-relaxed">
        Dostarczamy nowoczesne rozwiązania dla osób zainteresowanych swoją
        pasją.
      </p>
      <div className="flex space-x-4 pt-2">
        {socialLinks.map((social) => (
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
  )
}
