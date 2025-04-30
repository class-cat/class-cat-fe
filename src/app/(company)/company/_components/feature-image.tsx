import { motion } from "framer-motion"
import Image from "next/image"
import { useInView } from "~/app/_hooks/useInView"
import { type RefObject } from "react"
import { type Feature } from "~/types/company.type"

interface Props {
  feature: Feature
}

export const FeatureImage = ({ feature }: Props) => {
  const [ref, isInView] = useInView<HTMLDivElement>({
    threshold: 0.1,
    freezeOnceVisible: true,
  })

  return (
    <motion.div
      ref={ref as RefObject<HTMLDivElement | null>}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-lg border border-secondary bg-[#fff] shadow-sm"
    >
      <Image
        src={feature.image}
        alt={feature.title || "image"}
        width={400}
        height={300}
        className="h-auto w-full"
      />
      <div className="bg-[#fff] p-4">
        <h3 className="text-lg font-semibold">{feature.title}</h3>
      </div>
    </motion.div>
  )
}