import { Container } from "~/components/ui/container"

import { HomeContent } from "./_components/home-content"
import { RecommendedCategories } from "./_components/recommended-categories"
import { SearchBar } from "./_components/search-bar"

export default function HomePage() {
  return (
    <Container className="h-full flex-1 justify-center pt-2 md:pt-6">
      <section className="md:bg-secondary md:rounded-3xl">
        <SearchBar />
      </section>
      <div className="md:h-10" />
      <HomeContent />
      <div className="md:h-8" />
      <RecommendedCategories />
      <div className="md:h-8" />
    </Container>
  )
}
