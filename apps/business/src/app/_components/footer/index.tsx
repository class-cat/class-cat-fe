import { FooterSocials } from "./footer-socials"
import { FooterNavigation } from "./footer-navigation"
import { FooterDocs } from "./footer-docs"

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
        <div className="border-gray-800 flex flex-col items-center justify-start border-t pt-8 md:flex-row">
          <p className="text-gray-400 text-sm">
            © {currentYear} ClassCat. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  )
}
