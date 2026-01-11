"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { usePost } from "~/app/_hooks/usePost"
import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Textarea } from "~/components/ui/textarea"
import { ENDPOINTS } from "~/lib/const"
import { type Review } from "~/types/user.type"
import { toast } from "sonner"

import {
  AddReviewSchema,
  type AddReviewFormData,
} from "../_schema/add-review-schema.zod"

interface Props {
  acticitySlug: string
}

export const AddReviewDialog = ({ acticitySlug }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)
  const router = useRouter()
  const { mutate, isPending } = usePost<AddReviewFormData, Review>({
    url: ENDPOINTS.ACTIVITIES.REVIEW(acticitySlug),
  })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const validation = AddReviewSchema.safeParse({ rating, comment })

    if (!validation.success) {
      console.error("Validation errors:", validation.error.format())
      toast.error("Coś poszło nie tak")
      return
    }
    const parsedData = validation.data
    mutate(parsedData, {
      onSuccess: () => {
        toast.success("Opinia została dodana")
        router.refresh()
      },
      onError: (error) => {
        toast.error("Coś poszło nie tak")
        console.error(error.message)
      },
    })

    setIsOpen(false)
    setComment("")
    setRating(0)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" disabled={isPending}>
          {isPending ? (
            <Icons.spinner className="size-4 animate-spin" />
          ) : (
            <>Dodaj opinię</>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dodaj opinię</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700"
            >
              Twoja opinia
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ocena
            </label>
            <div className="mt-1 flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icons.star
                  key={star}
                  className={`size-6 cursor-pointer ${
                    star <= rating
                      ? "fill-primary text-primary"
                      : "text-foregroundMuted"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsOpen(false)}
            >
              Anuluj
            </Button>
            <Button type="submit">Wyślij opinię</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
