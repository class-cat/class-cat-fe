import { SignedIn } from "@clerk/nextjs"
import { AddReviewDialog } from "./review-dialog"
import Reviews from "./reviews"

interface ReviewsSectionProps {
  slug: string
}

export function ReviewsSection({ slug }: ReviewsSectionProps) {
  return (
    <section>
      <Reviews slug={slug} />
      <SignedIn>
        <AddReviewDialog acticitySlug={slug} />
      </SignedIn>
    </section>
  )
} 