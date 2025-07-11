import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormInstance } from 'antd'
import { AxiosError } from 'axios'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { createLesson } from '~/lib/api/services/lessons'
import { ICreateLessonRequest, IErrorResponseData, QueryKeys } from '~/lib/api/types'
import { message } from '~/shared/utils/antd-static-functions'
import { ICreateBonusFormValues } from '../types'

export const useCreateLesson = (
  closeDrawer: () => void,
  form: FormInstance<ICreateBonusFormValues>,
) => {
  const params = useParams()
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const createLessonMutation = useMutation({
    mutationFn: createLesson,
    onSuccess: async () => {
      message.success(t('NOTIFICATION.BONUS_CREATED'))
      form.resetFields()
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_LESSONS] })
      closeDrawer()
    },
    onError: async (error: AxiosError<IErrorResponseData>) => {
      message.error(error.response?.data.message)
    },
  })

  const onFinish = async ({ files, ...values }: ICreateBonusFormValues) => {
    if (!values.cover) {
      return message.error(t('NOTIFICATION.IMAGE_REQUIRED'))
    }
    if (!params.id || !params.secondId) {
      return
    }

    const data: ICreateLessonRequest = {
      course: JSON.stringify({ id: params.secondId }),
      week: JSON.stringify({ id: params.id }),
      ...(files && files.length > 0 && { files }),
      ...values,
    }

    await createLessonMutation.mutateAsync(data)
  }
  return { onFinish, isLoading: createLessonMutation.isPending }
}
