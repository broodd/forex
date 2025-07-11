import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormInstance } from 'antd'
import { AxiosError } from 'axios'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { createLesson } from '~/lib/api/services/lessons'
import { ICreateLessonRequest, IErrorResponseData, QueryKeys } from '~/lib/api/types'
import { message } from '~/shared/utils/antd-static-functions'
import { ICreateDayFormValues } from '../types'

export const useCreateLesson = (
  closeDrawer: () => void,
  form: FormInstance<ICreateDayFormValues>,
) => {
  const params = useParams()
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const createLessonMutation = useMutation({
    mutationFn: createLesson,
    onSuccess: async () => {
      message.success(t('NOTIFICATION.DAY_CREATED'))
      form.resetFields()
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_LESSONS] })
      closeDrawer()
    },
    onError: async (error: AxiosError<IErrorResponseData>) => {
      message.error(error.response?.data.message)
    },
  })

  const onFinish = async ({ coverPlaceholder, ...values }: ICreateDayFormValues) => {
    if (!values.cover) {
      return message.error(t('NOTIFICATION.IMAGE_REQUIRED'))
    }
    if (!params.id) {
      return
    }

    const data: ICreateLessonRequest = {
      course: JSON.stringify({ id: params.id }),
      ...(coverPlaceholder && { coverPlaceholder }),
      ...values,
    }

    await createLessonMutation.mutateAsync(data)
  }
  return { onFinish, isLoading: createLessonMutation.isPending }
}
