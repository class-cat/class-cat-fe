import Image from "next/image"
import React from "react"
import { Icons } from "~/components/icons"
import { type LessonType } from "./lessonCard"

export function Card({
  lesson,
  children,
}: {
  lesson: LessonType
  children?: React.ReactNode
}) {
  const { avatar, title, address, providerName, phoneNumber } = lesson

  const rightSlot = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === Card.RightSlot
  )
  const review = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === Card.Review
  )
  return (
    <div className="pSmall rounded-2xl bg-white">
      <div className="flex justify-between gap-4">
        <div className="flex justify-between gap-4">
          <Image
            src={avatar}
            alt="lesson avi"
            width={144}
            height={144}
            className="hidden rounded-xl md:block"
          />
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">{title}</h3>
            <div className="flex items-center gap-1">
              <Icons.map className="size-4" />
              <p className="text-xs text-foregroundMuted">{providerName}</p>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-row items-center gap-1 pt-1">
                <Icons.store className="size-4" />
                <p className="text-xs text-foregroundMuted">{address}</p>
              </div>
              <div className="flex items-center gap-1 pt-1">
                <Icons.phone className="size-4" />
                <p className="text-xs text-foregroundMuted">{phoneNumber}</p>
              </div>
            </div>
          </div>
        </div>
        {rightSlot}
      </div>
      {review}
    </div>
  )
}

interface ComponentProps extends React.HTMLAttributes<HTMLElement> {}

Card.RightSlot = function RightSlot({ children, className }: ComponentProps) {
  return <div className={className}>{children}</div>
}

Card.Review = function Review({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
