interface RootLayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: RootLayoutProps) {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </>
  )
}
