export interface Location {
  id: string
  name: string
  addressLine: string
  city: string
  postalCode: string
  createdAt: string
  updatedAt?: string
}

export interface LocationListResponse {
  results: Location[]
  count: number
}

