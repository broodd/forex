import { IFile } from './file'
import { ILesson } from './lesson'
import { IListRequestParams } from './list'
import { IWeek } from './weeks'

export interface ICourse {
  id: string
  createdAt: string
  updatedAt: string
  title: string
  description?: string
  type: ECourseType
  price: number
  salePrice?: number
  isVisible: boolean
  position: number
  productId?: string
  cover?: IFile
  coverPlaceholder: IFile | null
  weeks?: IWeek[]
  lessons?: ILesson[]
  __subscribers_count?: string
  __lessons_count?: string
  __done_lessons_count?: string
  status: ECourseStatus
  bannerCover?: IFile
}

export interface IGetCoursesRequestParams extends IListRequestParams {
  isVisible?: boolean
}

export enum ECourseType {
  COURSE = 'COURSE',
  CHALLENGE = 'CHALLENGE',
}

export enum ECourseStatus {
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_TO_START = 'WAITING_TO_START',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
}

export interface ICreateCourseRequest {
  title: string
  description?: string
  type: ECourseType
  price: number
  salePrice?: number
  isVisible?: boolean
  cover: Blob
  coverPlaceholder?: Blob | null
  bannerCover?: Blob
}

export interface IUpdateCourseRequest {
  id: string
  title?: string
  description?: string
  type?: ECourseType
  price?: number
  salePrice?: number
  isVisible?: boolean
  cover?: Blob
  coverPlaceholder?: Blob | null
  position?: number
  bannerCover?: Blob | string
}
