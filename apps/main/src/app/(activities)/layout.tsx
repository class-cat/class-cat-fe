import { Suspense } from "react"
import { TopNav } from "../_components/top-nav"

export const metadata = {
  title: "Search",
  description: "Search for activities",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="paddingX h-min-screen w-max-screen grid grid-rows-[auto,1fr] bg-white">
      <TopNav />
      <Suspense>
        <div className="bg-white">{children}</div>
      </Suspense>
    </div>
  )
}
