import { ICourse } from './courses'
import { IFile } from './file'
import { IListRequestParams } from './list'
import { IWeek } from './weeks'

export interface ILesson {
  id: string
  createdAt: string
  updatedAt: string
  title: string
  description?: string
  cover?: IFile
  isVisible: boolean
  position: number
  files?: IFile[]
  weekId?: string
  courseId: string
  course: ICourse
  week: IWeek
  doneLessons?: IDoneLesson[]
  __is_done?: boolean
  coverPlaceholder?: IFile
}

export interface IDoneLesson {
  id: string
  createdAt: string
  updatedAt: string
  lessonId?: string
  ownerId?: string
}

export interface IGetLessonsRequestParams extends IListRequestParams {
  isVisible?: boolean
  challangeId?: string
  weekId?: string
}

export interface ICreateLessonRequest {
  title: string
  description?: string
  isVisible?: boolean
  position?: number
  cover: Blob
  coverPlaceholder?: Blob
  files?: Blob[] | string
  course: { id: string } | string
  week?: { id: string } | string
}

export interface IUpdateLessonRequest {
  id: string
  title?: string
  description?: string
  isVisible?: boolean
  position?: number
  cover?: Blob
  coverPlaceholder?: Blob
  files?: Blob[]
  course?: { id: string } | string
  week?: { id: string } | string
}
