import { IFile } from './file'
import { IIngredientList } from './food'
import { IListRequestParams } from './list'

export interface IRecipe {
  id: string
  createdAt: string
  updatedAt: string
  protein: number
  carbohydrate: number
  fat: number
  energy: number
  title: string
  description?: string
  categories?: ERecipeCategoryEnum[]
  properties?: ERecipePropertyEnum[]
  duration?: number
  cover?: IFile
  coverPlaceholder: IFile | null
  viewsCount: number
  isOneServing: boolean
  sections?: ISection[]
  ingredients?: IIngredient[]
  __is_bookmark?: boolean
  isVisible?: boolean
}

export interface ISection {
  id: string
  createdAt: string
  updatedAt: string
  type: ESelectionType
  text: string
  position: number
  file: IFile
  filePlaceholder: IFile | null
  recipeId: string
}

export enum ESelectionType {
  TITLE = 'TITLE',
  TEXT = 'TEXT',
  FILE = 'FILE',
}

export interface IIngredient {
  id: string
  createdAt: string
  updatedAt: string
  protein: number
  carbohydrate: number
  fat: number
  energy: number
  food: string
  measure: string
  quantity: number
  recipeId: string
  possibleUnits?: string[]
  isCustom: boolean
}

export interface IGetRecipesRequest extends IListRequestParams {
  categories?: ERecipeCategoryEnum[]
  properties?: ERecipePropertyEnum[]
}

export interface ICreateRecipeRequest {
  ingredientList: IIngredientList[] | string
  title: string
  description?: string
  categories?: ERecipeCategoryEnum[]
  properties?: ERecipePropertyEnum[]
  duration: number
  cover: Blob
  coverPlaceholder?: Blob | null
  isOneServing?: boolean
  sections?: ICreateSectionRequest[] | string
  isVisible?: boolean
}

export interface ICreateSectionRequest {
  type?: ESelectionType
  text?: string
  position?: number
  file?: { id: string }
  filePlaceholder?: string | null
}

export interface IUpdateRecipeRequest {
  id: string
  ingredientList?: IIngredientList[] | string
  title?: string
  description?: string
  categories?: ERecipeCategoryEnum[]
  properties?: ERecipePropertyEnum[]
  duration?: number
  cover?: Blob
  coverPlaceholder?: Blob | null
  isOneServing?: boolean
  sections?: ICreateSectionRequest[] | string
  isVisible?: boolean
}

export enum ERecipeCategoryEnum {
  Frühstück = 'Frühstück',
  Hauptspeise = 'Hauptspeise',
  Salat = 'Salat',
  Suppen = 'Suppen',
  Snack = 'Snack',
  Brote = 'Brote',
  Dessert = 'Dessert',
  Dips = 'Dips',
  Saucen = 'Saucen',
}

export enum ERecipePropertyEnum {
  'Glow up' = 'Glow up',
  'High Protein' = 'High Protein',
  'Vegan' = 'Vegan',
  'Vegetarisch' = 'Vegetarisch',
  'Low Carb' = 'Low Carb',
  'Keto' = 'Keto',
  'Laktosefrei' = 'Laktosefrei',
  'kompl. KH' = 'kompl. KH',
}
