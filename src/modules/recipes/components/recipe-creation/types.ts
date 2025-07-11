import { ERecipeCategoryEnum, ERecipePropertyEnum, ESelectionType, IFile } from '~/lib/api/types'
import {
  ICustomIngredientsField,
  ISelectedIngredient,
} from '~/lib/components/ingredients-calculator/types'

export interface ICreateRecipeFormValues {
  title: string
  categories?: ERecipeCategoryEnum[]
  properties?: ERecipePropertyEnum[]
  duration: number
  ingredientList: ISelectedIngredient[]
  isVisible?: boolean
  description?: string
  cover: File
  coverPlaceholder?: File
  sections?: {
    type: ESelectionType
    title?: string
    text?: string
    file?: IFile
    filePlaceholder?: IFile
  }[]
  customIngredients: ICustomIngredientsField[]
}
