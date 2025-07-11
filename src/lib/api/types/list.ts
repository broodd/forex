export interface IListRequestParams {
  selection?: string[]
  page?: number
  take?: number
  asc?: string
  desc?: string
  search?: string
}

export interface IListResponse<T> {
  isLocked?: boolean
  result: T[]
  count: number
}

export interface IListRequest {
  params: IListRequestParams
}
