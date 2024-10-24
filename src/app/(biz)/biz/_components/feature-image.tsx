import { motion } from "framer-motion"
import Image from "next/image"
import { type Feature } from "../page"

interface FeatureImageProps {
  feature: Feature
}

export function FeatureImage({ feature }: FeatureImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-lg border border-secondary bg-[#fff] shadow-sm"
    >
      <Image
        src={feature.image}
        alt={feature.title || 'image'}
        width={400}
        height={300}
        className="h-auto w-full"
      />
      <div className="bg-[#fff]  p-4">
        <h3 className="text-lg font-semibold">{feature.title}</h3>
      </div>
    </motion.div>
  )
}