import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { type LucideIcon } from "lucide-react"
import { useInView } from "~/app/_hooks/useInView"

interface FeatureCardProps {
  feature: {
    icon: LucideIcon
    title: string
    description: string[]
  }
  index: number
  onHover: () => void
  onLeave: () => void
}

export function FeatureCard({
  feature,
  index,
  onHover,
  onLeave,
}: FeatureCardProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({
    threshold: 0.1,
    freezeOnceVisible: true,
  })

  return (
    <motion.div
      ref={ref}
      className="flex"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Card className="flex w-full flex-col border-secondary bg-[#fff] shadow-sm transition-shadow duration-300 hover:shadow-md">
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
