import React from "react"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: RootLayoutProps) {
  return (
    <>
      <div className="flex min-h-screen justify-center">
        <div className="container flex items-center justify-center">
          {children}
        </div>
      </div>
    </>
  )
}
