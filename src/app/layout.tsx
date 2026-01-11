import "~/styles/globals.css"

import { plPL } from "@clerk/localizations"
import { ClerkProvider } from "@clerk/nextjs"
import { FavoritesProvider } from "~/providers/favorites-provider"
import { ReactQueryProvider } from "~/providers/reactquery-provider"
import TokenProvider from "~/providers/token-provider"
import { inter, mochiy } from "~/styles/fonts"
import { Toaster } from "sonner"

export const metadata = {
  title: "Class Cat",
  description: "Application for after school activities",
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
        <html lang="pl" suppressHydrationWarning>
          <body
            className={`font-sans ${inter.variable} dark ${mochiy.variable}`}
          >
            <FavoritesProvider>
              <TokenProvider>{children}</TokenProvider>
            </FavoritesProvider>
            <Toaster position="top-right" richColors />
          </body>
        </html>
      </ClerkProvider>
    </ReactQueryProvider>
  )
}
