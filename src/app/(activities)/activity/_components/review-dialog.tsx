"use client"

import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Textarea } from "~/components/ui/textarea"
import { Button } from "~/components/ui/button"
import { Icons } from "~/components/icons"

export function AddReviewDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the review to your backend
    console.log("Submitted review:", { review, rating })
    setIsOpen(false)
    setReview("")
    setRating(0)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Dodaj opinię</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dodaj opinię</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="review"
              className="text-gray-700 block text-sm font-medium"
            >
              Twoja opinia
            </label>
            <Textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="mt-1"
              rows={4}
              required
            />
          </div>
          <div>
            <label className="text-gray-700 block text-sm font-medium">
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
