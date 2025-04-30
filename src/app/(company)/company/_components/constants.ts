import { Award, Calendar, TrendingUp, Users } from "lucide-react"
import { type Feature } from "~/types/company.type"

export const features: Feature[] = [
  {
    icon: Calendar,
    title: "Inteligentny kalendarz",
    description: [
      "Automatyczna synchronizacja z różnymi platformami",
      "Inteligentne sugestie terminów spotkań",
      "Przypomnienia i powiadomienia",
    ],
    image: "/demo.png",
  },
  {
    icon: Users,
    title: "Zarządzanie klientami",
    description: [
      "Centralna baza danych klientów",
      "Śledzenie historii interakcji",
      "Segmentacja klientów",
    ],
    image: "/demo.png",
  },
  {
    icon: TrendingUp,
    title: "Wgląd w biznes",
    description: [
      "Zaawansowane raporty analityczne",
      "Wizualizacje danych w czasie rzeczywistym",
      "Prognozy i trendy",
    ],
    image: "/demo.png",
  },
  {
    icon: Award,
    title: "Narzędzia marketingowe",
    description: [
      "Automatyzacja kampanii e-mailowych",
      "Personalizacja treści marketingowych",
      "Analiza skuteczności kampanii",
    ],
    image: "/demo.png",
  },
]

export const steps = [
  "Wypełnij formularz rejestracyjny",
  "Zweryfikuj swoje dane biznesowe",
  "Wybierz plan odpowiedni dla Twojej firmy",
  "Zacznij korzystać z platformy",
]
