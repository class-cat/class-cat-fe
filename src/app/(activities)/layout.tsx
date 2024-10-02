import { TopNav } from "../../components/topnav/topnav"

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
      <div className="bg-white">{children}</div>
    </div>
  )
}
