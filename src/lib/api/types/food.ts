export interface INutrientsDetails {
  carbohydrate: number
  energy: number
  protein: number
  fat: number
  ingredients: INutrientsDetailsIngredient[]
}

export interface IIngredientList {
  protein: number
  carbohydrate: number
  fat: number
  energy: number
  food: string
  measure: string
  quantity: number
  possibleUnits: string[]
  isCustom: boolean
}
export interface INutrientsDetailsIngredient {
  food: string
  measure?: string
  quantity?: number
  carbohydrate?: number
  energy?: number
  protein?: number
  possibleUnits: string[]
  fat?: number
}

export interface IGetIngredientsResponse {
  id: number | string
  name: string
  image: string
  aisle: string
  possibleUnits: string[]
}

export interface ICreateNutrientsDetails {
  ingredientList: IIngredientList[]
}
