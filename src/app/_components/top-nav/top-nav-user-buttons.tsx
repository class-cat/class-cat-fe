import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs"
import { Link } from "lucide-react"

import { ROUTES } from "~/lib/const"
import { userButtonAppearance } from "./constants"
import { Button } from "~/components/ui/button"

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
      <Button variant="outline" className="shadow-none" asChild>
        <Link href={ROUTES.COMPANY.ROOT}>Dodaj zajęcia</Link>
      </Button>
    </div>
  )
}
