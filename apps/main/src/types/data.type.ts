export type DataType<T> = {
  count: number | null
  next: string | null
  previous: string | null
  data: Array<T>
  sucess: boolean
}
