import { createFormData } from '~/shared/utils/create-form-data'
import {
  ICourse,
  ICreateCourseRequest,
  IGetCoursesRequestParams,
  IListResponse,
  IUpdateCourseRequest,
} from '../types'
import { queryBuilder } from './base-api-query'

export const createCourse = async (data: ICreateCourseRequest): Promise<ICourse> => {
  const formData = createFormData(data)

  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.post('courses', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const getCourses = async (
  params: IGetCoursesRequestParams,
): Promise<IListResponse<ICourse>> => {
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.get('courses', { params })
  return response.data
}

export const getCourse = async (id: string): Promise<ICourse> => {
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.get(`courses/${id}`)
  return response.data
}

export const updateCourse = async ({ id, ...data }: IUpdateCourseRequest): Promise<ICourse> => {
  const formData = createFormData(data)
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.patch(`courses/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const deleteCourse = async (id: string): Promise<ICourse> => {
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.delete(`courses/${id}`)
  return response.data
}
