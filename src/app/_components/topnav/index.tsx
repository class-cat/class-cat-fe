import { Container } from "~/components/ui/container"
import { TopNavButtons } from "./topnavButtons"
export function TopNav() {
  return (
    <nav className="h-[80px] bg-secondary px-4 shadow sm:px-24">
      <Container className="flex h-full items-center justify-between text-xl font-semibold">
        <div>
          <h1 className="font-logo text-primary">
            <a href="/">ClassCat</a>
          </h1>
        </div>
        <TopNavButtons />
      </Container>
    </nav>
  )
}
