import { Container } from "~/components/ui/container"
import { SearchBar } from "./_components/search-bar"
import { RecommendedCategories } from "./_components/recommended-categories"
import { CompanyOffer } from "./_components/company-offer"
import { HomeContent } from "./_components/home-content"


export default function HomePage() {
  return (
    <Container className="h-full flex-1 justify-center pt-2 md:pt-6">
      <section className="md:rounded-3xl md:bg-secondary">
        <SearchBar />
      </section>
      <div className="md:h-10" />
      <HomeContent />
      <div className="md:h-8" />
      <RecommendedCategories />
      <div className="md:h-8" />
      <CompanyOffer />
    </Container>
  )
}
