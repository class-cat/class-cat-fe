"use client"

import { type RefObject, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "~/components/ui/container"
import {Hero} from "./_components/hero"
import { FeatureCard } from "./_components/feature-card"
import { FeatureImage } from "./_components/feature-image"
import {BusinessAccount} from "./_components/business-account"
import { useInView } from "~/app/_hooks/useInView"
import { features } from "./_components/constants"
import { type Feature } from "~/types/company.type"


export default function HomePage() {
  const [activeFeature, setActiveFeature] = useState<number>(0)
  const [ref, isInView] = useInView<HTMLDivElement>({
    threshold: 0.1,
    freezeOnceVisible: true,
  })

  const handleCardClick = (index: number) => {
    setActiveFeature(index)
  }

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
        <div className="container">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            <div className="grid grid-cols-1 gap-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  feature={feature}
                  index={index}
                  isActive={index === activeFeature}
                  onClick={() => handleCardClick(index)}
                />
              ))}
            </div>
            <div className="col-span-2 hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <AnimatePresence mode="wait">
                  <FeatureImage
                    key={activeFeature}
                    feature={features[activeFeature] as Feature}
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      <BusinessAccount />
    </Container>
  )
}