import { createFormData } from '~/shared/utils/create-form-data'
import {
  ICreateWeekRequest,
  IGetWeeksRequestParams,
  IListResponse,
  IUpdateWeekRequest,
  IWeek,
} from '../types'
import { queryBuilder } from './base-api-query'

export const createWeek = async (data: ICreateWeekRequest): Promise<IWeek> => {
  const formData = createFormData(data)

  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.post('course-weeks', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const getWeeks = async (params: IGetWeeksRequestParams): Promise<IListResponse<IWeek>> => {
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.get('course-weeks/admin', { params })
  return response.data
}

export const getWeek = async (id: string): Promise<IWeek> => {
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.get(`course-weeks/${id}/admin`)
  return response.data
}

export const updateWeek = async ({ id, ...data }: IUpdateWeekRequest): Promise<IWeek> => {
  const formData = createFormData(data)
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.patch(`course-weeks/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const deleteWeek = async (id: string): Promise<IWeek> => {
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.delete(`course-weeks/${id}`)
  return response.data
}
