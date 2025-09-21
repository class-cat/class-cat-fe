'use client'

import { useFavorites } from "~/app/_hooks/useFavorites"
import { Pill } from "~/components/pill/pill"
import { Skeleton } from "~/components/ui/skeleton"

export const FavoritesContent = () => {
  const { favorites, isLoaded } = useFavorites()

  if (!isLoaded) {
    return (
      <div className="flex flex-col gap-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[110px] rounded-2xl sm:h-[150px]" />
        ))}
      </div>
    )
  }

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 text-6xl">❤️</div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          Brak ulubionych zajęć
        </h3>
        <p className="text-sm text-foregroundMuted">
          Dodaj zajęcia do ulubionych, klikając na ikonę serca
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {favorites.map((activity) => (
        <Pill key={activity.slug} {...activity} />
      ))}
    </div>
  )
}
