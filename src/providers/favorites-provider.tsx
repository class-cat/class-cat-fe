"use client"

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface FavoriteActivity {
  slug: string
  name: string
  location: string
  primaryImage?: {
    file: string
  }
  description?: string
}

interface FavoritesContextType {
  favorites: FavoriteActivity[]
  addToFavorites: (activity: FavoriteActivity) => void
  removeFromFavorites: (slug: string) => void
  toggleFavorite: (activity: FavoriteActivity) => void
  isFavorite: (slug: string) => boolean
  isLoaded: boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

const FAVORITES_KEY = 'class-cat-favorites'

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteActivity[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load favorites from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(FAVORITES_KEY)
      if (stored) {
        try {
          const parsedFavorites = JSON.parse(stored)
          setFavorites(parsedFavorites)
        } catch (error) {
          console.error('Error parsing favorites from localStorage:', error)
          setFavorites([])
        }
      }
      setIsLoaded(true)
    }
  }, [])

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    if (typeof window !== 'undefined' && isLoaded) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    }
  }, [favorites, isLoaded])

  const addToFavorites = (activity: FavoriteActivity) => {
    setFavorites(prev => {
      const exists = prev.some(fav => fav.slug === activity.slug)
      if (!exists) {
        return [...prev, activity]
      }
      return prev
    })
  }

  const removeFromFavorites = (slug: string) => {
    setFavorites(prev => prev.filter(fav => fav.slug !== slug))
  }

  const toggleFavorite = (activity: FavoriteActivity) => {
    const exists = favorites.some(fav => fav.slug === activity.slug)
    if (exists) {
      removeFromFavorites(activity.slug)
    } else {
      addToFavorites(activity)
    }
  }

  const isFavorite = (slug: string) => {
    return favorites.some(fav => fav.slug === slug)
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
        isLoaded,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
} 