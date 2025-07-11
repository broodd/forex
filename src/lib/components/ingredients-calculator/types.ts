export interface ISelectedIngredient {
  name: string
  enabled: boolean
  measure: string
  quantity: number
  energy: number
  carbohydrate: number
  protein: number
  fat: number
  possibleUnits: string[]
  isCustom: boolean
}

export interface INutritionProgress {
  carbohydrate: number
  energy: number
  fat: number
  protein: number
}

export interface ICustomIngredientsField {
  enabled: boolean
  name: string
  measure: string
  quantity: number
  protein: number
  fat: number
  carbohydrate: number
  energy: number
}
