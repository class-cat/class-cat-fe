"use client"

import { motion } from "framer-motion"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import Link from "next/link"
import { useInView } from "~/app/_hooks/useInView"
import { ROUTES } from "~/lib/const"
import { type RefObject } from "react"
import { steps } from "./constants"

export const BusinessAccount = () => {
  const [ref, isInView] = useInView<HTMLDivElement>({
    threshold: 0.1,
    freezeOnceVisible: true,
  })

  return (
    <motion.section
      ref={ref as RefObject<HTMLDivElement | null>}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="to-gray-100 w-full bg-gradient-to-b from-white  md:py-4"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h3 className="tracking-tighter">Stwórz konto biznesowe już dziś</h3>
          <span className="text-muted mx-auto max-w-4xl text-base md:text-lg">
            Odkryj pełen potencjał naszej platformy i zacznij rozwijać swój
            biznes z naszymi zaawansowanymi narzędziami.
          </span>
        </div>
        <div className="mx-auto max-w-xl py-12">
          <Card className="border-secondary bg-[#fff] shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Kroki do utworzenia konta
              </CardTitle>
              <CardDescription className="text-base">
                Postępuj zgodnie z tymi prostymi krokami, aby rozpocząć
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-6">
                {steps.map((step, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
                    }
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-[#fff]">
                      {index + 1}
                    </span>
                    <span className="text-lg">{step}</span>
                  </motion.li>
                ))}
              </ol>
            </CardContent>
            <CardFooter>
              <Button className="mt-6 w-full py-6 text-lg">
                <Link prefetch={true} href={ROUTES.COMPANY.SIGN_UP}>
                  Rozpocznij rejestrację
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </motion.section>
  )
}
