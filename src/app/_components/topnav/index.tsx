import { Container } from "~/components/ui/container"
import { TopNavButtons } from "./topnavButtons"
export function TopNav() {
  return (
    <Container>
      <nav className="flex h-[80px] w-full items-center justify-between text-xl font-semibold">
        <div>
          <span className="font-logo text-2xl text-primary">
            <a href="/">ClassCat</a>
          </span>
        </div>
        <TopNavButtons />
      </nav>
    </Container>
  )
}
