import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FormInstance } from 'antd'
import { AxiosError } from 'axios'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { getLesson, updateLesson } from '~/lib/api/services/lessons'
import { IErrorResponseData, IUpdateLessonRequest, QueryKeys } from '~/lib/api/types'
import { useLessonsStore } from '~/modules/lessons/store'
import { message } from '~/shared/utils/antd-static-functions'
import { IUpdateLessonFormValues } from '../types'

export const useEditLesson = (
  closeDrawer: () => void,
  form: FormInstance<IUpdateLessonFormValues>,
) => {
  const params = useParams()
  const { lessonID, setLessonID } = useLessonsStore()
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const {
    data: lesson,
    isFetching,
    isLoading: isDataLoading,
  } = useQuery({
    queryKey: [QueryKeys.GET_LESSON_DETAILS, lessonID],
    queryFn: () => getLesson(lessonID || ''),
    enabled: !!lessonID,
  })

  const initialValues = {
    cover: lesson?.cover,
    title: lesson?.title,
    isVisible: lesson?.isVisible,
    coverPlaceholder: lesson?.coverPlaceholder,
  }

  const editLessonMutation = useMutation({
    mutationFn: updateLesson,
    onSuccess: async () => {
      message.success(t('NOTIFICATION.DAY_UPDATED'))

      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_LESSONS] })
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_LESSON_DETAILS] })
      onClose()
    },
    onError: async (error: AxiosError<IErrorResponseData>) => {
      message.error(error.response?.data.message)
    },
  })

  const onFinish = async ({ cover, coverPlaceholder, ...values }: IUpdateLessonFormValues) => {
    if (!params.id || !lessonID) {
      return
    }

    const data: IUpdateLessonRequest = {
      id: lessonID,
      course: JSON.stringify({ id: params.id }),
      ...(coverPlaceholder && { coverPlaceholder }),
      ...(cover && { cover }),
      ...values,
    }

    await editLessonMutation.mutateAsync(data)
  }

  const onClose = () => {
    form.resetFields()
    setLessonID(null)
    closeDrawer()
  }

  return {
    onFinish,
    isLoading: editLessonMutation.isPending || isFetching || isDataLoading,
    initialValues,
    onClose,
  }
}
