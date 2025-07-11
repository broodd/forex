export interface IUpdateLessonFormValues {
  cover: File
  title: string
  description: string
  files?: File[] | undefined
  isVisible?: boolean
  coverPlaceholder?: File
}
