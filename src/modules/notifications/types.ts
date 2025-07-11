import { Dayjs } from 'dayjs'

export enum EDrawerKeys {
  NOTIFICATION_EDIT = 'NOTIFICATION_EDIT',
  NOTIFICATION_CREATION = 'NOTIFICATION_CREATION',
}

export interface INotificationCreationFormValues {
  title: string
  body?: string
  image?: File
  reminderTime?: Dayjs
  date?: [Dayjs | null, Dayjs | null]
}

export interface INotificationEditFormValues {
  title?: string
  body?: string
  reminderTime?: Dayjs
}
