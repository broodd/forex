import { ECourseType } from '~/lib/api/types'

export interface IEditCourseFormValues {
  title: string
  type: ECourseType
  price: string
  isVisible?: boolean
  cover?: File
  coverPlaceholder?: File
  description?: string
  bannerCover?: File
}
