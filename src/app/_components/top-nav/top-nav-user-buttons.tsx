import Link from "next/link"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button } from "~/components/ui/button"
import { ROUTES } from "~/lib/const"

import { userButtonAppearance } from "./constants"

export const TopNavUserButtons = () => {
  return (
    <div className="flex flex-row items-center gap-4 max-sm:hidden">
      <SignedOut>
        <Button className="shadow-none" asChild>
          <Link href={ROUTES.ROOT.SIGN_IN}>Zaloguj się</Link>
        </Button>
      </SignedOut>
      <SignedIn>
        <UserButton
          userProfileUrl={ROUTES.ROOT.PROFILE}
          appearance={userButtonAppearance}
        />
      </SignedIn>
    </div>
  )
}
