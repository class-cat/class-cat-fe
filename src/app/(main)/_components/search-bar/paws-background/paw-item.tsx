import { Icons } from "~/components/icons"

interface PawItemProps {
  id: string
  x: number
  y: number
  opacity: number
}

export const PawItem = ({ id, x, y, opacity }: PawItemProps) => (
  <Icons.paw
    key={id}
    className="absolute size-16"
    color="#ecdec8"
    fill="#ecdec8"
    style={{
      left: `${x}px`,
      top: `${y}px`,
      opacity,
      transition: "opacity 0.3s ease-in-out",
    }}
  />
) 