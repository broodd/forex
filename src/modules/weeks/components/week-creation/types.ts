import { EWeekType } from '~/lib/api/types'

export interface ICreateWeekFormValues {
  title: string
  type: EWeekType
  isVisible?: boolean
  cover: File
  titleCover: File
  questions?: IQuestionValues[]
}

export interface IQuestionValues {
  question: string
  answerCorrect: string
  answerFalse1: string
  answerFalse2: string
  description?: string
}
