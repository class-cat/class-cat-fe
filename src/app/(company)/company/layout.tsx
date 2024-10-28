import "~/styles/globals.css"

import React from "react"
import { TopNav } from "~/app/_components/topnav/topnav"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="paddingX h-min-screen w-max-screen grid grid-rows-[auto,1fr] bg-white">
        <TopNav />
        <main className="bg-white">{children}</main>
      </div>
      <footer className="padding h-[153px] bg-foreground text-white max-sm:hidden">
        ClassCat
      </footer>
    </>
  )
}
