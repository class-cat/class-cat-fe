import Image from "next/image"
import React from "react"
import { Icons } from "~/components/icons"
import { type LessonType } from "./lessonCard"
import { IconWithText } from "~/components/ui/icon-text"

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
    <div className="pSmall cursor-pointer items-center gap-4 rounded-2xl border-2 border-primary/30 bg-white hover:shadow-md">
      <div className="flex justify-between gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative size-[50px] sm:size-[80px]">
            {avatar ? (
              <Image
                src={avatar}
                alt={title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            ) : (
              <Icons.placeholder />
            )}
          </div>
          <div className="flex h-full flex-col justify-stretch">
            <p className="font-medium">{title}</p>
            <IconWithText text={providerName}>
              <Icons.map className="size-4" />
            </IconWithText>
            <div className="flex gap-4">
              <IconWithText text={address}>
                <Icons.store className="size-4" />
              </IconWithText>
              <IconWithText text={phoneNumber}>
                <Icons.phone />
              </IconWithText>
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
