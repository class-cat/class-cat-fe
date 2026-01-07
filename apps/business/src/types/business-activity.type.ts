export interface BusinessActivity {
  id: string
  name: string
  description: string
  locationId: string
  employeeId?: string
  categories: string[]
  createdAt: string
  updatedAt?: string
}

export interface BusinessActivityListResponse {
  results: BusinessActivity[]
  count: number
}

