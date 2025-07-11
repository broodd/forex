import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import { deleteCourse } from '~/lib/api/services'
import { QueryKeys } from '~/lib/api/types'
import { deleteCourseConfirmModal } from '~/lib/components/confirm-modals'
import { useCoursesStore } from '~/modules/courses/store'
import { EDrawerKeys } from '~/modules/courses/types'
import { useDrawerContext } from '~/shared/ui/drawer/hooks'

export const useActions = () => {
  const { courseID } = useCoursesStore()
  const { closeDrawer, openDrawer } = useDrawerContext()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const deleteCourseMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: async () => {
      closeDrawer()
      message.success(t('NOTIFICATION.COURSE_DELETED'))
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_COURSES] })
    },
  })

  const onDelete = () => {
    if (!courseID) return
    deleteCourseMutation.mutate(courseID)
  }

  const onDeleteClick = () => {
    deleteCourseConfirmModal(onDelete)
  }

  const onEdit = () => {
    closeDrawer()
    openDrawer(EDrawerKeys.COURSE_EDIT)
  }
  return { onDeleteClick, onEdit }
}
