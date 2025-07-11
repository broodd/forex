import { createFormData } from '~/shared/utils/create-form-data'
import {
  ICreateLessonRequest,
  IGetLessonsRequestParams,
  ILesson,
  IListResponse,
  IUpdateLessonRequest,
} from '../types'
import { queryBuilder } from './base-api-query'

export const createLesson = async (data: ICreateLessonRequest): Promise<ILesson> => {
  const formData = createFormData(data)

  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.post('course-lessons', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const getLessons = async (
  params: IGetLessonsRequestParams,
): Promise<IListResponse<ILesson>> => {
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.get('course-lessons', { params })
  return response.data
}

export const getLesson = async (id: string): Promise<ILesson> => {
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.get(`course-lessons/${id}`)
  return response.data
}

export const updateLesson = async ({ id, ...data }: IUpdateLessonRequest): Promise<ILesson> => {
  const formData = createFormData(data)
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.patch(`course-lessons/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const deleteLesson = async (id: string): Promise<ILesson> => {
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.delete(`course-lessons/${id}`)
  return response.data
}
