import { useMutation, useQuery } from '@tanstack/react-query'
import { useWatch } from 'antd/es/form/Form'
import useFormInstance from 'antd/es/form/hooks/useFormInstance'
import { AxiosError } from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'
import { useDebounce } from 'react-use'
import { createNutrientsDetails, getIngredients } from '~/lib/api/services'
import { IErrorResponseData, IIngredientList, QueryKeys } from '~/lib/api/types'
import { message } from '~/shared/utils/antd-static-functions'
import { ICustomIngredientsField, INutritionProgress, ISelectedIngredient } from '../types'

export const useSearch = (
  // selectedIngr: ISelectedIngredient[],
  setSelectedIngr: Dispatch<SetStateAction<ISelectedIngredient[]>>,
  // calculate: boolean,
  // setCalculate: Dispatch<SetStateAction<boolean>>,
  setNutritionProgress: Dispatch<SetStateAction<INutritionProgress | undefined>>,
) => {
  const form = useFormInstance()
  const customIngredientsValues: ICustomIngredientsField[] = useWatch('customIngredients', form)
  console.log('customIngredientsValues', customIngredientsValues)
  const [searchValue, setSearchValue] = useState<string>('')
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>('')

  useDebounce(
    () => {
      setDebouncedSearchValue(searchValue)
    },
    500,
    [searchValue],
  )

  const onSearch = (value: string) => {
    setSearchValue(() => value)
  }

  const {
    data: ingredients,
    isFetching,
    isLoading: isDataLoading,
  } = useQuery({
    queryKey: [QueryKeys.GET_INGREDIENTS, debouncedSearchValue],
    queryFn: () => getIngredients(debouncedSearchValue),
    enabled: !!debouncedSearchValue,
  })

  const onSelect = (value: string) => {
    const selectedPossibleUnits = ingredients
      ? ingredients.filter((item) => item.name === value)[0].possibleUnits
      : []
    const newIngr: ISelectedIngredient = {
      name: value,
      enabled: true,
      possibleUnits: selectedPossibleUnits,
      carbohydrate: 0,
      energy: 0,
      fat: 0,
      isCustom: false,
      measure: '',
      protein: 0,
      quantity: 0,
    }
    setSelectedIngr((prev) => [...prev, newIngr])
  }

  const calculateDetails = useMutation({
    mutationFn: createNutrientsDetails,
    onError: async (error: AxiosError<IErrorResponseData>) => {
      message.error(error.response?.data.message)
    },
    onSuccess: (data) => {
      setSelectedIngr((prev) =>
        prev.map((item, itemIndex) => {
          const nutrientData = data.ingredients.find(
            (_nutrient, nutrientIndex) => nutrientIndex === itemIndex,
          )
          return nutrientData ? { ...item, ...nutrientData } : item
        }),
      )

      setNutritionProgress({
        carbohydrate: data.carbohydrate,
        energy: data.energy,
        fat: data.fat,
        protein: data.protein,
      })
    },
  })

  const onCalculate = (data: ISelectedIngredient[]) => {
    const customIngredients: IIngredientList[] = customIngredientsValues
      ?.filter((item) => item?.enabled)
      .map((item) => ({
        carbohydrate: item?.carbohydrate || 0,
        energy: item?.energy || 0,
        fat: item?.fat || 0,
        food: item?.name || '',
        isCustom: true,
        measure: item?.measure || '',
        protein: item?.protein || 0,
        quantity: item?.quantity || 0,
        possibleUnits: [],
      }))

    const ingredients: IIngredientList[] = data.map((item) => ({
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
    calculateDetails.mutate({ ingredientList: [...ingredients, ...customIngredients] })
  }

  const options = ingredients
    ? ingredients.map((item) => ({ label: item.name, value: item.name }))
    : []

  return {
    onSearch,
    searchValue,
    debouncedSearchValue,
    isLoading: isDataLoading || isFetching || calculateDetails.isPending,
    onSelect,
    options,
    onCalculate,
  }
}
