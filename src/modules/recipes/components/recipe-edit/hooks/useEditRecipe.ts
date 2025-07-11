import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FormInstance } from 'antd'
import { AxiosError } from 'axios'
import { useTranslation } from 'react-i18next'
import { getRecipe, updateRecipe } from '~/lib/api/services'
import {
  IErrorResponseData,
  IIngredientList,
  IUpdateRecipeRequest,
  QueryKeys,
} from '~/lib/api/types'
import { message } from '~/shared/utils/antd-static-functions'
import { IEditRecipeFormValues } from '../types'
import { useRecipesStore } from '~/modules/recipes/store'

export const useEditRecipe = (
  closeDrawer: () => void,
  form: FormInstance<IEditRecipeFormValues>,
) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { recipeID, setRecipeID } = useRecipesStore()

  const {
    data: recipe,
    isFetching,
    isLoading: isDataLoading,
  } = useQuery({
    queryKey: [QueryKeys.GET_RECIPE_DETAILS, recipeID],
    queryFn: () => getRecipe(recipeID || ''),
    enabled: !!recipeID,
  })

  const initialValues = {
    title: recipe?.title,
    isOneServing: recipe?.isOneServing,
    categories: recipe?.categories,
    properties: recipe?.properties,
    duration: recipe?.duration,
    ingredientList: recipe?.ingredients?.filter((item) => item.isCustom !== true),
    customIngredients: recipe?.ingredients?.filter((item) => item.isCustom === true),
    isVisible: recipe?.isVisible,
    description: recipe?.description,
    cover: recipe?.cover,
    coverPlaceholder: recipe?.coverPlaceholder,
    sections: recipe?.sections,
    carbohydrate: recipe?.carbohydrate,
    fat: recipe?.fat,
    protein: recipe?.protein,
    energy: recipe?.energy,
  }

  const editRecipeMutation = useMutation({
    mutationFn: updateRecipe,
    onSuccess: async () => {
      message.success(t('NOTIFICATION.RECIPE_UPDATED'))
      form.resetFields()
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_RECIPES] })
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_RECIPE_DETAILS] })
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
  }: IEditRecipeFormValues) => {
    if (!recipeID) {
      return
    }

    const customIngredientsData: IIngredientList[] | undefined = customIngredients?.map((item) => ({
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

    const ingredients: IIngredientList[] | undefined = ingredientList?.map((item) => ({
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

    const data: IUpdateRecipeRequest = {
      id: recipeID,
      ...(sections && {
        sections: JSON.stringify(
          sections
            .filter((item) => !(item.type === 'FILE' && item.file === null))
            .filter((item) => !(item.type === 'TEXT' && item.text === null))
            .filter((item) => !(item.type === 'TITLE' && item.title === null))
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
      ...((ingredients || customIngredientsData) && {
        ingredientList: JSON.stringify([...(ingredients || []), ...(customIngredientsData || [])]),
      }),
      ...(coverPlaceholder && { coverPlaceholder }),
      ...values,
    }

    await editRecipeMutation.mutateAsync(data)
  }

  const onClose = () => {
    form.resetFields()
    setRecipeID(null)
    closeDrawer()
  }

  return {
    onFinish,
    isLoading: editRecipeMutation.isPending || isFetching || isDataLoading,
    onClose,
    initialValues,
  }
}
