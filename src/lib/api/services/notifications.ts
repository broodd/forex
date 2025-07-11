import { createFormData } from '~/shared/utils/create-form-data'
import {
  ENotificationType,
  ICreateCustomNotificationRequest,
  IGetNotificationsRequest,
  IListResponse,
  INotification,
  IReminderNotification,
  IUpdateNotification,
} from '../types'
import { queryBuilder } from './base-api-query'

export const getNotifications = async (
  params: IGetNotificationsRequest,
): Promise<IListResponse<INotification>> => {
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.get('notifications/options', { params })
  return response.data
}

export const createNotification = async (
  data: ICreateCustomNotificationRequest,
): Promise<INotification> => {
  const formData = createFormData(data)
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.post('notifications/options', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const deleteNotification = async (id: string): Promise<INotification> => {
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.delete(`notifications/options/${id}`)
  return response.data
}

export const getNotificationByType = async (
  type: ENotificationType,
): Promise<IReminderNotification> => {
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.get(`notifications/options/metadata/${type}`)
  return response.data
}

export const updateNotification = async (data: IUpdateNotification): Promise<INotification> => {
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.patch('notifications/options/metadata', { ...data })
  return response.data
}
