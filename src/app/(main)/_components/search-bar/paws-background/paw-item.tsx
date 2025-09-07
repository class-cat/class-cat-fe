import { Icons } from "~/components/icons"

interface PawItemProps {
  id: string
  x: number
  y: number
  opacity: number
  unit?: "px" | "%"
}

export const PawItem = ({ id, x, y, opacity, unit = "px" }: PawItemProps) => (
  <Icons.paw
    key={id}
    className="absolute size-16"
    color="#ecdec8"
    fill="#ecdec8"
    style={{
      left: `${x}${unit}`,
      top: `${y}${unit}`,
      opacity,
      transition: "opacity 0.3s ease-in-out",
    }}
  />
) 