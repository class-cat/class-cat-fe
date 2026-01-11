import { FooterDocs } from "./footer-docs"
import { FooterNavigation } from "./footer-navigation"
import { FooterSocials } from "./footer-socials"

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-foreground bg-gradient-to-br py-12 text-white max-md:hidden">
      <div className="container mx-auto px-6">
        <div className="mb-8 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <FooterSocials />
          <FooterNavigation />
          <FooterDocs />
        </div>
        <div className="flex flex-col items-center justify-start border-t border-gray-800 pt-8 md:flex-row">
          <p className="text-sm text-gray-400">
            © {currentYear} ClassCat. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  )
}
