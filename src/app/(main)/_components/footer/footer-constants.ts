import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react"

export const socialLinks = [
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
]

export const footerLinks = [
  { href: "/", label: "Strona główna" },
  { href: "/o-nas", label: "O nas" },
  { href: "/kontakt", label: "Kontakt" },
]

export const docsLinks = [
  { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
  { href: "/regulamin", label: "Regulamin" },
  { href: "/cookies", label: "Polityka cookies" },
  { href: "/dostepnosc", label: "Dostępność WCAG" },
]

export const contactArray = [
  { icon: MapPin, content: "ul. Przykładowa 123, 00-000 Warszawa" },
  { icon: Phone, content: "+48 123 456 789" },
  { icon: Mail, content: "kontakt@classcat.pl" },
]
