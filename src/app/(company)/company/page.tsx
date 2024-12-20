"use client"

import { type RefObject, useState } from "react"
import {
  Calendar,
  Users,
  TrendingUp,
  Award,
  type LucideIcon,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "~/components/ui/container"
import Hero from "./_components/hero"
import { FeatureCard } from "./_components/feature-card"
import { FeatureImage } from "./_components/feature-image"
import BusinessAccountSection from "./_components/business-account"
import { useInView } from "~/app/_hooks/useInView"

export type Feature = {
  icon: LucideIcon
  title: string
  description: string[]
  image: string
}

const features: Feature[] = [
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

export default function HomePage() {
  const [hoveredFeature, setHoveredFeature] = useState<number>(0)
  const [ref, isInView] = useInView<HTMLDivElement>({
    threshold: 0.1,
    freezeOnceVisible: true,
  })

  return (
    <Container className="h-full flex-1 justify-center pt-2 md:pt-6">
      <section className="hidden md:block">
        <Hero />
      </section>
      <motion.section
        ref={ref as RefObject<HTMLDivElement | null>}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        id="features"
        className="md:py-18 w-full py-12"
      >
        <div className="container px-4 md:px-6">
          <h3 className="mb-10 text-center tracking-tighter">
            Zaawansowane narzędzia dla biznesu
          </h3>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            <div className="grid grid-cols-1 gap-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  feature={feature}
                  index={index}
                  onHover={() => setHoveredFeature(index)}
                  onLeave={() => setHoveredFeature(index)}
                />
              ))}
            </div>
            <div className="col-span-2 hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <AnimatePresence mode="wait">
                  {features[hoveredFeature] && (
                    <FeatureImage
                      key={hoveredFeature}
                      feature={features[hoveredFeature]}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      <BusinessAccountSection />
    </Container>
  )
}
