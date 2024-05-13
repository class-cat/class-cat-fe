import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>
        <h1 className="font-logo text-primary">
          <a href="/">ClassCat</a>
        </h1>
      </div>
      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  )
}
