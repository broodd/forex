import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import { QueryKeys } from '~/lib/api/types'
import { deleteLessonConfirmModal } from '~/lib/components/confirm-modals'

import { deleteLesson } from '~/lib/api/services/lessons'
import { useLessonsStore } from '~/modules/lessons/store'
import { EDrawerLessonKeys } from '~/modules/lessons/types'
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
      message.success(t('NOTIFICATION.LESSON_DELETED'))
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_LESSONS] })
    },
  })

  const onDelete = () => {
    if (!lessonID) return
    deleteLessonMutation.mutate(lessonID)
  }

  const onDeleteClick = () => {
    deleteLessonConfirmModal(onDelete)
  }

  const onEdit = () => {
    closeDrawer()
    openDrawer(EDrawerLessonKeys.LESSON_EDIT)
  }
  return { onDeleteClick, onEdit }
}
