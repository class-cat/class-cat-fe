import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "~/components/ui/card"

interface Props {
    title: string
    desc: string
    avatar: string
    href: string
  }

export const MostSearchItem = ({ title, desc, avatar, href }: Props) => {
    return (
      <Link prefetch={true} href={href}>
        <Card className="aspect-square rounded-2xl border-2 border-secondary bg-secondary p-4 shadow-none md:rounded-3xl">
          <CardContent className="flex h-full flex-col items-center justify-center  p-2">
            <div className="relative size-16 object-fill">
              <Image
                src={avatar}
                alt={title}
                className="rounded-lg"
                width={200}
                height={200}
              />
            </div>
            <div className="flex flex-col items-center justify-center pt-2 text-center capitalize max-md:hidden">
              <p className="text-md text-foregroundMuted">{title}</p>
              <p className="text-md text-foregroundMuted">{desc}</p>
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col items-center justify-center pt-2 text-center capitalize md:hidden">
          <p className="text-sm text-foregroundMuted">{title}</p>
        </div>
      </Link>
    )
  }