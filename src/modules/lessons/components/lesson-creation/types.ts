export interface ICreateLessonFormValues {
  cover: File
  coverPlaceholder?: File
  title: string
  description: string
  files?: File[] | undefined
  isVisible?: boolean
}
