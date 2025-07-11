import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormInstance } from 'antd'
import { AxiosError } from 'axios'
import { useTranslation } from 'react-i18next'
import { createRecipe } from '~/lib/api/services'
import {
  ICreateRecipeRequest,
  IErrorResponseData,
  IIngredientList,
  QueryKeys,
} from '~/lib/api/types'
import { message } from '~/shared/utils/antd-static-functions'
import { ICreateRecipeFormValues } from '../types'

export const useCreateRecipe = (
  closeDrawer: () => void,
  form: FormInstance<ICreateRecipeFormValues>,
) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const createRecipeMutation = useMutation({
    mutationFn: createRecipe,
    onSuccess: async () => {
      message.success(t('NOTIFICATION.RECIPE_CREATED'))
      form.resetFields()
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_RECIPES] })
      closeDrawer()
    },
    onError: async (error: AxiosError<IErrorResponseData>) => {
      message.error(error.response?.data.message)
    },
  })

  const onFinish = async ({
    sections,
    coverPlaceholder,
    ingredientList,
    customIngredients,
    ...values
  }: ICreateRecipeFormValues) => {
    if (!values.cover) {
      return message.error(t('NOTIFICATION.IMAGE_REQUIRED'))
    }
    if (ingredientList.length === 0) {
      return message.error(t('NOTIFICATION.INGR_REQUIRED'))
    }

    const customIngredientsData: IIngredientList[] = customIngredients?.map((item) => ({
      carbohydrate: item?.carbohydrate || 0,
      energy: item?.energy || 0,
      fat: item?.fat || 0,
      food: item?.name,
      isCustom: true,
      measure: item?.measure || '',
      ...(item.measure ? { possibleUnits: [item.measure] } : { possibleUnits: [] }),
      protein: item?.protein || 0,
      quantity: item?.quantity || 0,
    }))

    const ingredients: IIngredientList[] = ingredientList.map((item) => ({
      carbohydrate: item.carbohydrate || 0,
      energy: item.energy || 0,
      fat: item.fat || 0,
      food: item.name,
      isCustom: item.isCustom,
      measure: item.measure || '',
      possibleUnits: item.possibleUnits,
      protein: item.protein || 0,
      quantity: item.quantity || 0,
    }))

    const data: ICreateRecipeRequest = {
      ...(sections && {
        sections: JSON.stringify(
          sections
            .filter((item) => !(item.type === 'FILE' && item.file === null))
            .map((item) => {
              return {
                type: item.type,
                ...(item.title && { text: item.title }),
                ...(item.text && { text: item.text }),
                ...(item.file && { file: { id: item.file.id } }),
                ...(item.filePlaceholder && { filePlaceholder: { id: item.filePlaceholder.id } }),
              }
            }),
        ),
      }),
      ...(coverPlaceholder && { coverPlaceholder }),
      ingredientList: JSON.stringify([...ingredients, ...customIngredientsData]),
      ...values,
    }

    await createRecipeMutation.mutateAsync(data)
  }

  return { onFinish, isLoading: createRecipeMutation.isPending }
}
