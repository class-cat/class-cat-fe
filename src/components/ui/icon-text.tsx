import React from "react"

type IconWithTextProps = {
  text: string
  children?: React.ReactNode
}
export function IconWithText({ text, children }: IconWithTextProps) {
  return (
    <div className="flex flex-row items-center gap-1 pt-1">
      {children}
      <p className="text-xs text-foregroundMuted">{text}</p>
    </div>
  )
}
