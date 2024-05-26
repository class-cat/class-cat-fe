import React from "react"
import { cn } from "~/lib/utils"

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(className, "mx-auto w-full max-w-[1440px]")}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Container.displayName = "Container"

export { Container }
