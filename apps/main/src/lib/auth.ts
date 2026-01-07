import { useUser } from '@clerk/nextjs'

export function useIsCompany () {
  const { user } = useUser()

  return user?.publicMetadata.role === "company"
} 