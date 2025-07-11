import { createFormData } from '~/shared/utils/create-form-data'
import {
  ICreateRecipeRequest,
  IGetRecipesRequest,
  IListResponse,
  IRecipe,
  IUpdateRecipeRequest,
} from '../types'
import { queryBuilder } from './base-api-query'

export const createRecipe = async (data: ICreateRecipeRequest): Promise<IRecipe> => {
  const formData = createFormData(data)
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.post('recipes', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const getRecipes = async (params: IGetRecipesRequest): Promise<IListResponse<IRecipe>> => {
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.get('recipes/admin', { params })
  return response.data
}

export const getRecipe = async (id: string): Promise<IRecipe> => {
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.get(`recipes/${id}/admin`)
  return response.data
}

export const updateRecipe = async ({ id, ...data }: IUpdateRecipeRequest): Promise<IRecipe> => {
  const formData = createFormData(data)
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.patch(`recipes/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const deleteRecipe = async (id: string): Promise<IRecipe> => {
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.delete(`recipes/${id}`)
  return response.data
}
