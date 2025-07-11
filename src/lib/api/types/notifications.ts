import { IFile } from './file'
import { IListRequestParams } from './list'

export interface INotification {
  id: string
  createdAt: string
  updatedAt: string
  title: string
  body: string
  image: IFile
  startDate: string
  endDate: string
  reminderTime: string
}

export enum ENotificationType {
  WATER_REMINDER = 'WATER_REMINDER',
  STEPS_REMINDER = 'STEPS_REMINDER',
  RECIPE_CREATE = 'RECIPE_CREATE',
  POST_CREATE = 'POST_CREATE',
  CHAT_MESSAGE = 'CHAT_MESSAGE',
  CUSTOM = 'CUSTOM',
}

export interface IGetNotificationsRequest extends IListRequestParams {
  type?: ENotificationType
}

export interface ICreateCustomNotificationRequest {
  title: string
  body?: string
  image?: Blob
  reminderTime?: string
  startDate?: string
  endDate?: string
}

export interface IReminderNotification {
  title?: string
  body?: string
  reminderTime?: string
}

export interface IBasicNotification {
  title?: string
  body?: string
}

export interface IUpdateNotification {
  WATER_REMINDER?: IReminderNotification
  STEPS_REMINDER?: IReminderNotification
  RECIPE_CREATE?: IBasicNotification
  POST_CREATE?: IBasicNotification
}
