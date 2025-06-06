import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { type LucideIcon } from "lucide-react"
import { useInView } from "~/app/_hooks/useInView"
import { type RefObject } from "react"

interface Props {
  feature: {
    icon: LucideIcon
    title: string
    description: string[]
  }
  index: number
  isActive: boolean
  onClick: () => void
}

export const FeatureCard = ({ feature, index, isActive, onClick }: Props) => {
  const [ref, isInView] = useInView<HTMLDivElement>({
    threshold: 0.1,
    freezeOnceVisible: true,
  })

  return (
    <motion.div
      ref={ref as RefObject<HTMLDivElement | null>}
      className="flex"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
    >
      <Card
        className={`flex w-full flex-col bg-[#fff] shadow-sm transition-shadow duration-300 hover:shadow-md ${
          isActive ? "border-2 border-primary" : "border border-secondary"
        }`}
      >
        <CardHeader className="flex flex-row items-center gap-4">
          <feature.icon className="size-10 shrink-0 text-primary" />
          <CardTitle className="text-lg text-primary">
            {feature.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="grow">
          <div className="space-y-2">
            {feature.description.map((item, i) => (
              <p key={i} className="text-gray-600 text-sm">
                {item}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
