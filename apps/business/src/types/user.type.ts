interface Avatar {
  id: string
  file: string
  originalFileName: string
  fileName: string
  fileType: string
  uploadFinishedAt: string
}

export interface Author {
  username: string
  firstName: string
  lastName: string
  avatar: Avatar
}

export interface Activity {
  addedAt: string
  slug: string
  location: Location
  name: string
  primaryImage: any
  provider: any
}

export interface Review {
  slug: string
  rating: number
  createdAt: string
  comment: string
  author: Author
  activity: Activity
}
