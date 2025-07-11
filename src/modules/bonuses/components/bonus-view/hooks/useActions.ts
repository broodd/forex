import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import { QueryKeys } from '~/lib/api/types'
import { deleteBonusConfirmModal } from '~/lib/components/confirm-modals'

import { deleteLesson } from '~/lib/api/services/lessons'
import { EDrawerBonusKeys } from '~/modules/bonuses/types'
import { useLessonsStore } from '~/modules/lessons/store'
import { useDrawerContext } from '~/shared/ui/drawer/hooks'

export const useActions = () => {
  const { lessonID } = useLessonsStore()
  const { closeDrawer, openDrawer } = useDrawerContext()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const deleteLessonMutation = useMutation({
    mutationFn: deleteLesson,
    onSuccess: async () => {
      closeDrawer()
      message.success(t('NOTIFICATION.BONUS_DELETED'))
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_LESSONS] })
    },
  })

  const onDelete = () => {
    if (!lessonID) return
    deleteLessonMutation.mutate(lessonID)
  }

  const onDeleteClick = () => {
    deleteBonusConfirmModal(onDelete)
  }

  const onEdit = () => {
    closeDrawer()
    openDrawer(EDrawerBonusKeys.BONUS_EDIT)
  }
  return { onDeleteClick, onEdit }
}
