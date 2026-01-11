import Link from "next/link"

import { footerLinks } from "./constants"

export const FooterNavigation = () => {
  return (
    <div className="space-y-6">
      <h3 className="relative inline-block text-lg font-[500] text-white">
        <span className="after:bg-primary after:mt-1 after:block after:h-1 after:w-full after:rounded-full after:content-['']">
          Nawigacja
        </span>
      </h3>
      <nav className="flex flex-col space-y-3">
        {footerLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="group relative w-fit text-gray-300 transition-all duration-300 hover:text-white"
          >
            <span>
              {link.label}
              <span className="bg-primary absolute -bottom-1 left-0 h-0.5 w-0 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
