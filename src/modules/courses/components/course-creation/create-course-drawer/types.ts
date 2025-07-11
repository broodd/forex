import { ECourseType } from '~/lib/api/types'

export interface ICreateCourseFormValues {
  title: string
  type: ECourseType
  price: string
  isVisible?: boolean
  cover: File
  coverPlaceholder?: File
  description?: string
  bannerCover?: File
}
