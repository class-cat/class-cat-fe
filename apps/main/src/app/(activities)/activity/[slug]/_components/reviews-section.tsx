import { SignedIn } from "@clerk/nextjs"
import { AddReviewForm } from "./review-dialog"
import Reviews from "./reviews"

interface ReviewsSectionProps {
  slug: string
}

export function ReviewsSection({ slug }: ReviewsSectionProps) {
  return (
    <section>
      <Reviews slug={slug} />
      <SignedIn>
        <AddReviewForm acticitySlug={slug} />
      </SignedIn>
    </section>
  )
} 