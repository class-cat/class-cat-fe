'use client'

// Note: This hook requires the consuming app to have ~/providers/favorites-provider
// This is a re-export that will be resolved by the consuming app's TypeScript configuration
// @ts-expect-error - Path alias resolved by consuming app
export { useFavorites, type FavoriteActivity } from '~/providers/favorites-provider'

