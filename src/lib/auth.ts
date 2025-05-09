import { useUser } from '@clerk/nextjs'

export function useIsCompany () {
  const { user } = useUser()

  console.log(user) 
  // Adjust this logic if your company role is stored differently
  return true
} 