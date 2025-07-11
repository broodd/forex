import { ICourse } from './courses'
import { IFile } from './file'
import { ILesson } from './lesson'
import { IListRequestParams } from './list'
import { ICreateQuestion, IQuestion, IUpdateQuestion } from './questions'

export interface IWeek {
  id: string
  createdAt: string
  updatedAt: string
  type: EWeekType
  title: string
  cover?: IFile
  titleCover?: IFile
  isVisible: boolean
  position: number
  courseId: string
  course?: ICourse
  lessons?: ILesson[]
  questions?: IQuestion[]
  __questions_count?: string
  __done_questions_count?: string
  __lessons_count?: string
  __lessons_files_count?: string
  __done_lessons_count?: string
  bodyResultPeriod?: string
  bodyResult?: object
  status: EWeekStatus
}

export enum EWeekStatus {
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_TO_START = 'WAITING_TO_START',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
}
export enum EWeekType {
  WEEK = 'WEEK',
  BONUS = 'BONUS',
}

export interface IGetWeeksRequestParams extends IListRequestParams {
  isVisible?: boolean
  courseId: string
}

export interface ICreateWeekRequest {
  title: string
  type: EWeekType
  position?: number
  isVisible?: boolean
  cover: Blob
  titleCover: Blob
  course: { id: string } | string
  questions?: ICreateQuestion[] | string
}

export interface IUpdateWeekRequest {
  id: string
  title?: string
  type?: EWeekType
  position?: number
  isVisible?: boolean
  cover?: Blob
  titleCover?: Blob
  course?: { id: string } | string
  questions?: IUpdateQuestion[] | string
}
