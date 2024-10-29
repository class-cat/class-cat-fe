import "~/styles/globals.css"
import { TopNav } from "../_components/topnav/topnav"
import React from "react"

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
      <footer className="padding h-[153px] bg-foreground text-white max-md:hidden">
        ClassCat
      </footer>
    </>
  )
}
