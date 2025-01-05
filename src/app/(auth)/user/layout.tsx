interface RootLayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: RootLayoutProps) {
  return (
    <>
      <div className="paddingX h-min-screen grid w-screen grid-rows-[auto,1fr] bg-white">
        <div className="flex h-[calc(100vh-120px)] justify-center">
          <div className="container flex items-center justify-center">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
