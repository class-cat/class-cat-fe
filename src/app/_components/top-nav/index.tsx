import { Container } from "~/components/ui/container"
import { TopNavButtons } from "./top-nav-buttons"
import { ROUTES } from "~/lib/const"
import Image from "next/image"

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
          <span className="font-logo text-2xl text-primary">
            <a href={ROUTES.ROOT.HOME}>ClassCat</a>
          </span>
        </div>
        <TopNavButtons />
      </nav>
    </Container>
  )
}
