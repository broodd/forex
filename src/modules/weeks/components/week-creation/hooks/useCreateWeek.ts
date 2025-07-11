import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormInstance } from 'antd'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { createWeek } from '~/lib/api/services/weeks'
import { ICreateWeekRequest, IErrorResponseData, QueryKeys } from '~/lib/api/types'
import { message } from '~/shared/utils/antd-static-functions'
import { ICreateWeekFormValues } from '../types'
import { AxiosError } from 'axios'

export const useCreateWeek = (
  closeDrawer: () => void,
  form: FormInstance<ICreateWeekFormValues>,
) => {
  const { id } = useParams()
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const createWeekMutation = useMutation({
    mutationFn: createWeek,
    onSuccess: async () => {
      message.success(t('NOTIFICATION.WEEK_CREATED'))
      form.resetFields()
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_WEEKS] })
      closeDrawer()
    },
    onError: async (error: AxiosError<IErrorResponseData>) => {
      message.error(error.response?.data.message)
    },
  })

  const onFinish = async ({ questions, ...values }: ICreateWeekFormValues) => {
    if (!values.cover || !values.titleCover) {
      return message.error(t('NOTIFICATION.IMAGE_REQUIRED'))
    }
    if (!id) {
      return
    }

    const questionsForRequest = questions?.map((item) => ({
      question: item.question,
      description: item.description,
      options: [item.answerCorrect, item.answerFalse1, item.answerFalse2],
      correctAnswer: 0,
    }))

    const data: ICreateWeekRequest = {
      course: JSON.stringify({ id }),
      ...(questionsForRequest &&
        questionsForRequest.length > 0 && { questions: JSON.stringify(questionsForRequest) }),
      ...values,
    }

    await createWeekMutation.mutateAsync(data)
  }
  return { onFinish, isLoading: createWeekMutation.isPending }
}
