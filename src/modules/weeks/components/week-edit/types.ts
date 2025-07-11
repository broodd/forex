import { EWeekType } from '~/lib/api/types'

export interface IEditWeekFormValues {
  title?: string
  type?: EWeekType
  isVisible?: boolean
  cover?: File
  titleCover?: File
  questions?: IQuestionValues[]
}

export interface IQuestionValues {
  id: string
  question: string
  answerCorrect: string
  answerFalse1: string
  answerFalse2: string
  description?: string
}
