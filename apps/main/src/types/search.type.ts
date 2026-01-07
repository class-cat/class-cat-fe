export type CordinatesType = {
  lat: number | null
  lon: number | null
}

export type Location = {
  id: number
  name: string
  location_type: string
  address: {
    addressLine: string
    city: string
    postalCode: string
    coordinates: CordinatesType
  }
}

export type EntireLocation = {
  value: string
  label: string
}

export type Provider = {
  slug: string
  name: string
  phoneNumber: string
  email: string
  websiteUrl: string
  isVerified: boolean
}

export type Category = {
  slug: string
  name: string
  numberOfActivities: number
}

export type Image = {
  id: string
  file: string
  originalFileName: string
  fileName: string
  fileType: string
  uploadFinishedAt: string
}

export type Activity = {
  slug: string
  name: string
  addedAt: string
  description: string
  location: Location
  provider: Provider
  categories: Category[]
  images: Image[]
  primaryImage: Image
}

export type ActivitiesData = {
  count: number
  next: string | null
  previous: string | null
  results: Activity[]
}

export type QueryParams = {
  nameValue: string | null
  locationValue: string | null
  sortValue: string | null
}

export type SearchResultType = "activity" | "location" | "provider" | "category"

export type ResultType = {
  searchType: SearchResultType
  slug: string
}
