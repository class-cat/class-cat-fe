import "~/styles/globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { plPL } from "@clerk/localizations"
import { ReactQueryProvider } from "~/providers/reactquery-provider"
import { inter, mochiy } from "~/styles/fonts"

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReactQueryProvider>
      <ClerkProvider localization={plPL} dynamic>
        <html lang="en">
          <body
            className={`font-sans ${inter.variable} dark ${mochiy.variable}`}
          >
            {children}
          </body>
        </html>
      </ClerkProvider>
    </ReactQueryProvider>
  )
}
