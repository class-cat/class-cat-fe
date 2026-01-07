import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs"


import { ROUTES } from "~/lib/const"
import { userButtonAppearance } from "./constants"
import { Button } from "@class-cat/ui"
import Link from "next/link"

export const TopNavUserButtons = () => {
  return (
    <div className="flex flex-row items-center gap-4 max-sm:hidden">
      <SignedOut>
        <Button className="shadow-none" asChild>
          <Link href={ROUTES.SIGN_IN}>Zaloguj się</Link>
        </Button>
      </SignedOut>
      <SignedIn>
        <UserButton
          userProfileUrl={ROUTES.PROFILE}
          appearance={userButtonAppearance}
        />
      </SignedIn>
    </div>
  )
}
