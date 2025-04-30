import Link from "next/link"
import { docsLinks } from "./footer-constants"

export const FooterDocs = () => {
    return (
<div className="space-y-6">
            <h3 className="relative inline-block text-lg font-[500] text-white">
              <span className="after:mt-1 after:block after:h-1 after:w-full after:rounded-full after:bg-primary after:content-['']">
                Dokumenty
              </span>
            </h3>
            <nav className="flex flex-col space-y-3">
              {docsLinks.map((link) => (
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
    )
}

