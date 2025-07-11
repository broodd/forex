import { useQuery } from '@tanstack/react-query'
import { getRecipe } from '~/lib/api/services'
import { QueryKeys } from '~/lib/api/types'
import { useRecipesStore } from '~/modules/recipes/store'

export const useRecipeDetails = () => {
  const { recipeID } = useRecipesStore()

  const {
    data: recipe,
    isFetching,
    isLoading: isDataLoading,
  } = useQuery({
    queryKey: [QueryKeys.GET_RECIPE_DETAILS, recipeID],
    queryFn: () => getRecipe(recipeID || ''),
    enabled: !!recipeID,
  })

  return { recipe, isLoading: isFetching || isDataLoading }
}
