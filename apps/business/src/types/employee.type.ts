export interface Employee {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  position?: string
  createdAt: string
  updatedAt?: string
}

export interface EmployeeListResponse {
  results: Employee[]
  count: number
}

