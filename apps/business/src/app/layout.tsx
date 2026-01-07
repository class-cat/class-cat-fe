import "~/styles/globals.css"
import { ReactQueryProvider } from "~/providers/reactquery-provider"
import { BusinessClerkProvider } from "~/providers/clerk-provider"
import { inter, mochiy } from "~/styles/fonts"
import { Toaster } from "sonner"
import React from "react"
import { TopNav } from "~/app/_components/top-nav"
import { Sidebar } from "./_components/sidebar"

export const metadata = {
  title: "Class Cat Business",
  description: "Business platform for after school activities",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body
        className={`font-sans ${inter.variable} dark ${mochiy.variable}`}
      >
        <ReactQueryProvider>
          <BusinessClerkProvider>
            <div className="h-screen w-full flex flex-col bg-white">
              <TopNav />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto paddingX bg-white">{children}</main>
              </div>
            </div>
            <Toaster position="top-right" richColors />
          </BusinessClerkProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
