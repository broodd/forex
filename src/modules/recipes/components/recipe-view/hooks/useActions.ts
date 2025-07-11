import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import { deleteRecipe } from '~/lib/api/services'
import { QueryKeys } from '~/lib/api/types'
import { deleteRecipeConfirmModal } from '~/lib/components/confirm-modals'
import { useRecipesStore } from '~/modules/recipes/store'
import { EDrawerRecipesKeys } from '~/modules/recipes/types'
import { useDrawerContext } from '~/shared/ui/drawer/hooks'

export const useActions = () => {
  const { recipeID } = useRecipesStore()
  const { closeDrawer, openDrawer } = useDrawerContext()
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const deleteRecipeMutation = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: async () => {
      closeDrawer()
      message.success(t('NOTIFICATION.RECIPE_DELETED'))
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_RECIPES] })
    },
  })

  const onDelete = () => {
    if (!recipeID) return
    deleteRecipeMutation.mutate(recipeID)
  }

  const onDeleteClick = () => {
    deleteRecipeConfirmModal(onDelete)
  }

  const onEdit = () => {
    closeDrawer()
    openDrawer(EDrawerRecipesKeys.RECIPE_EDIT)
  }
  return { onDeleteClick, onEdit }
}
