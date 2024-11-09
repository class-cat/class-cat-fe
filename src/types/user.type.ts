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

export interface Review {
  slug: string
  rating: number
  comment: string
  author: Author
}
