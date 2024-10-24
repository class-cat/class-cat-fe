"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import Link from "next/link"

export default function BusinessAccountSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const [, setIsVisible] = useState(false)

  const steps = [
    "Wypełnij formularz rejestracyjny",
    "Zweryfikuj swoje dane biznesowe",
    "Wybierz plan odpowiedni dla Twojej firmy",
    "Zacznij korzystać z platformy"
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          controls.start("visible")
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [controls])

  return (
    <section className="to-gray-100 w-full bg-gradient-to-b from-white py-12 md:py-4">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-4 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Stwórz konto biznesowe już dziś
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-4xl md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Odkryj pełen potencjał naszej platformy i zacznij rozwijać swój biznes z naszymi zaawansowanymi narzędziami.
          </p>
        </motion.div>
        <div className="mx-auto max-w-2xl py-12">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <Card className="border-secondary bg-[#fff] shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Kroki do utworzenia konta</CardTitle>
                <CardDescription className="text-base">Postępuj zgodnie z tymi prostymi krokami, aby rozpocząć</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.ol className="space-y-6">
                  {steps.map((step, index) => (
                    <motion.li
                      key={index}
                      variants={itemVariants}
                      className="flex items-center space-x-4"
                    >
                      <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-[#fff]">
                        {index + 1}
                      </span>
                      <span className="text-lg">{step}</span>
                    </motion.li>
                  ))}
                </motion.ol>
              </CardContent>
              <CardFooter>
                <Button className="w-full py-6 text-lg">
                  <Link href="/company/sign-up">
                    Rozpocznij rejestrację
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}