import Link from "next/link"

import { socialLinks } from "./constants"

export const FooterSocials = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">
        <span className="from-primary bg-gradient-to-r to-blue-400 bg-clip-text text-transparent">
          ClassCat
        </span>
      </h3>
      <p className="max-w-xs leading-relaxed text-gray-300">
        Dostarczamy nowoczesne rozwiązania dla osób zainteresowanych swoją
        pasją.
      </p>
      <div className="flex space-x-4 pt-2">
        {socialLinks.map((social) => (
          <Link
            key={social.label}
            href={social.href}
            className="hover:text-primary flex size-10 items-center justify-center rounded-lg bg-gray-800 transition-all duration-300 hover:scale-110 hover:bg-gray-700"
          >
            <social.icon size={18} />
            <span className="sr-only">{social.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
