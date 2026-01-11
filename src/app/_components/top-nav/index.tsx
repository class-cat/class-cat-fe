import Image from "next/image"
import { Container } from "~/components/ui/container"
import { ROUTES } from "~/lib/const"

import { TopNavButtons } from "./top-nav-buttons"

export const TopNav = () => {
  return (
    <Container>
      <nav className="flex h-[80px] w-full items-center justify-between text-xl font-semibold">
        <div className="flex items-center">
          <Image
            src="/defaultcat.png"
            alt="Cute cat face peeking from the bottom"
            width={48}
            height={48}
            className="mr-2 object-cover sm:hidden"
          />
          <span className="font-logo text-primary text-2xl">
            <a href={ROUTES.ROOT.HOME}>ClassCat</a>
          </span>
        </div>
        <TopNavButtons />
      </nav>
    </Container>
  )
}
