"use client"

import { useState, useEffect } from "react"

import { Textarea } from "~/components/ui/textarea"
import { Button } from "~/components/ui/button"
import { Icons } from "~/components/icons"
import { usePost } from "~/app/_hooks/usePost"
import { useFetch } from "~/app/_hooks/useFetch"
import { httpClient } from "~/lib/http-client"
import { ENDPOINTS } from "~/lib/const"
import { toast } from "sonner"
import { type Review } from "~/types/user.type"
import { type DataType } from "~/types/data.type"
import { useRouter } from "next/navigation"
import {
  type AddReviewFormData,
  AddReviewSchema,
} from "../_schema/add-review-schema.zod"

interface Props {
  acticitySlug: string
}

export const AddReviewForm = ({ acticitySlug }: Props) => {
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()
  
  // Fetch user's existing reviews
  const { data: userReviews, isLoading } = useFetch<DataType<Review>>({
    url: ENDPOINTS.USER_REVIEWS,
  })

  // Check if user has already reviewed this activity
  const existingReview = userReviews?.data.find(
    (review) => review.activity.slug === acticitySlug
  )

  const isEditing = !!existingReview

  // Mutation for adding new reviews
  const { mutate: addReview, isPending: isAddPending } = usePost<AddReviewFormData, Review>({
    url: ENDPOINTS.ACTIVITIES.REVIEW(acticitySlug),
  })

  const isPending = isAddPending || isUpdating

  // Populate form with existing review data if editing
  useEffect(() => {
    if (existingReview) {
      setComment(existingReview.comment)
      setRating(existingReview.rating)
    }
  }, [existingReview])

  // Handle PATCH request for updating existing reviews
  const updateReview = async (data: AddReviewFormData) => {
    if (!existingReview) return

    setIsUpdating(true)
    try {
      await httpClient.patch(
        ENDPOINTS.ACTIVITIES.REVIEW_SINGLE(acticitySlug, existingReview.slug),
        data
      )
      toast.success("Opinia została zaktualizowana")
      router.refresh()
    } catch (error) {
      toast.error("Coś poszło nie tak podczas aktualizacji opinii")
      console.error("Update error:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const validation = AddReviewSchema.safeParse({ rating, comment })

    if (!validation.success) {
      console.error("Validation errors:", validation.error.format())
      toast.error("Coś poszło nie tak")
      return
    }

    const parsedData = validation.data

    if (isEditing) {
      updateReview(parsedData)
    } else {
      addReview(parsedData, {
        onSuccess: () => {
          toast.success("Opinia została dodana")
          router.refresh()
          setComment("")
          setRating(0)
        },
        onError: (error) => {
          toast.error("Coś poszło nie tak")
          console.error(error.message)
        },
      })
    }
  }

  if (isLoading) {
    return (
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-center py-8">
          <Icons.spinner className="size-6 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="mt-8 space-y-4">
      {isEditing && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm font-medium text-blue-800">
            Już wystawiłeś opinię o tych zajęciach. Możesz ją edytować poniżej.
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ocena
          </label>
          <div className="mt-1 flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Icons.star
                key={star}
                className={`size-6 cursor-pointer text-primary ${
                  star <= rating && "fill-primary"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Komentarz
          </label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-1"
            rows={4}
            required
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Icons.spinner className="mr-2 size-4 animate-spin" />
                {isEditing ? "Aktualizowanie..." : "Wysyłanie..."}
              </>
            ) : (
              isEditing ? "Zaktualizuj opinię" : "Wyślij opinię"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
