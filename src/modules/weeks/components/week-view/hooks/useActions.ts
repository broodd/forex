import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import { deleteWeek } from '~/lib/api/services/weeks'
import { QueryKeys } from '~/lib/api/types'
import { deleteWeekConfirmModal } from '~/lib/components/confirm-modals'

import { EDrawerKeys } from '~/modules/weeks/types'
import { useWeeksStore } from '~/modules/weeks/store'
import { useDrawerContext } from '~/shared/ui/drawer/hooks'

export const useActions = () => {
  const { weekID } = useWeeksStore()
  const { closeDrawer, openDrawer } = useDrawerContext()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const deleteWeekMutation = useMutation({
    mutationFn: deleteWeek,
    onSuccess: async () => {
      closeDrawer()
      message.success(t('NOTIFICATION.WEEK_DELETED'))
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_WEEKS] })
    },
  })

  const onDelete = () => {
    if (!weekID) return
    deleteWeekMutation.mutate(weekID)
  }

  const onDeleteClick = () => {
    deleteWeekConfirmModal(onDelete)
  }

  const onEdit = () => {
    closeDrawer()
    openDrawer(EDrawerKeys.WEEK_EDIT)
  }
  return { onDeleteClick, onEdit }
}
