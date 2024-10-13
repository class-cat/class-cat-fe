export type CordinatesType = {
  lat: number | null
  lon: number | null
}

export type Location = {
  id: number
  name: string
  location_type: string
  address: {
    address_line: string
    city: string
    postal_code: string
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
  website_url: string
  is_verified: boolean
}

export type Category = {
  slug: string
  name: string
  number_of_activities: number
}

export type Image = {
  id: string
  file: string
  original_file_name: string
  file_name: string
  file_type: string
  upload_finished_at: string
}

export type Activity = {
  slug: string
  name: string
  added_at: string
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
