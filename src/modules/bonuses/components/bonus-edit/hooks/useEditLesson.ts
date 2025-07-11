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
    files: lesson?.files,
  }

  const editLessonMutation = useMutation({
    mutationFn: updateLesson,
    onSuccess: async () => {
      message.success(t('NOTIFICATION.BONUS_UPDATED'))

      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_LESSONS] })
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_LESSON_DETAILS] })
      onClose()
    },
    onError: async (error: AxiosError<IErrorResponseData>) => {
      message.error(error.response?.data.message)
    },
  })

  const onFinish = async ({ files, cover, ...values }: IUpdateLessonFormValues) => {
    if (!params.id || !params.secondId || !lessonID) {
      return
    }

    const data: IUpdateLessonRequest = {
      id: lessonID,
      course: JSON.stringify({ id: params.secondId }),
      week: JSON.stringify({ id: params.id }),
      ...(cover && { cover }),
      ...(files && files.length > 0 && { files }),
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
