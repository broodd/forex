import i18n from '~/i18n'
import { ECourseType, ERecipeCategoryEnum, ERecipePropertyEnum, EWeekType } from '../api/types'

export const courseTypeOptions = [
  { label: i18n.t('ACTIONS.COURSE_TYPE.COURSE'), value: ECourseType.COURSE },
  { label: i18n.t('ACTIONS.COURSE_TYPE.CHALLENGE'), value: ECourseType.CHALLENGE },
]

export const weekTypeOptions = [
  { label: i18n.t('ACTIONS.WEEK_TYPE.WEEK'), value: EWeekType.WEEK },
  { label: i18n.t('ACTIONS.WEEK_TYPE.BONUS'), value: EWeekType.BONUS },
]

export const recipeCategoryOptions = Object.values(ERecipeCategoryEnum).map((value) => ({
  label: value,
  value,
}))

export const recipePropertyOptions = Object.values(ERecipePropertyEnum).map((value) => ({
  label: value,
  value,
}))
