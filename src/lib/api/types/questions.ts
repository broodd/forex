export interface IQuestion {
  id: string
  createdAt: string
  updatedAt: string
  question: string
  description?: string
  correctAnswer: number
  options: string[]
  position: number | null
  weekId: string
  shuffledOptions?: string[]
  yourAnswer?: string
  rightAnswer?: boolean
}

export interface ICreateQuestion {
  question: string
  description?: string
  correctAnswer: number
  options: string[]
}

export interface IUpdateQuestion {
  id: string
  question: string
  description?: string
  correctAnswer: number
  options: string[]
}
