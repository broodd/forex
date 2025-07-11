import { ICreateNutrientsDetails, IGetIngredientsResponse, INutrientsDetails } from '../types'
import { queryBuilder } from './base-api-query'

export const getIngredients = async (q: string): Promise<IGetIngredientsResponse[]> => {
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const params = { q, language: 'de' }
  const response = await loader.get(`api-proxy/spoonacular/ingredients-auto-complete`, { params })
  return response.data
}

export const createNutrientsDetails = async (
  data: ICreateNutrientsDetails,
): Promise<INutrientsDetails> => {
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.post(`api-proxy/spoonacular/nutrients-details`, data)
  return response.data
}
