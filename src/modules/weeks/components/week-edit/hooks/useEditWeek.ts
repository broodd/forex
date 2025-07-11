import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FormInstance } from 'antd'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { getWeek, updateWeek } from '~/lib/api/services/weeks'
import { IErrorResponseData, IUpdateWeekRequest, QueryKeys } from '~/lib/api/types'
import { message } from '~/shared/utils/antd-static-functions'
import { IEditWeekFormValues } from '../types'
import { useWeeksStore } from '~/modules/weeks/store'
import { AxiosError } from 'axios'

export const useEditWeek = (closeDrawer: () => void, form: FormInstance<IEditWeekFormValues>) => {
  const { id } = useParams()
  const { weekID, setWeekID } = useWeeksStore()
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const {
    data: week,
    isFetching,
    isLoading: isDataLoading,
  } = useQuery({
    queryKey: [QueryKeys.GET_WEEKS_DETAILS, weekID],
    queryFn: () => getWeek(weekID || ''),
    enabled: !!weekID,
  })

  const initialValues = {
    cover: week?.cover,
    title: week?.title,
    type: week?.type,
    isVisible: week?.isVisible,
    titleCover: week?.titleCover,
    questions: week?.questions
      ? week.questions.map((item) => ({
          id: item.id,
          question: item.question,
          description: item.description,
          answerCorrect: item.options[item.correctAnswer],
          answerFalse1: item.options[1],
          answerFalse2: item.options[2],
        }))
      : undefined,
  }

  const updateWeekMutation = useMutation({
    mutationFn: updateWeek,
    onSuccess: async () => {
      message.success(t('NOTIFICATION.WEEK_UPDATED'))
      form.resetFields()
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_WEEKS] })
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_WEEKS_DETAILS] })
      closeDrawer()
    },
    onError: async (error: AxiosError<IErrorResponseData>) => {
      message.error(error.response?.data.message)
    },
  })

  const onFinish = async ({ questions, cover, titleCover, ...values }: IEditWeekFormValues) => {
    if (!id || !weekID) {
      return
    }

    const questionsForRequest = questions?.map((item) => ({
      id: item.id,
      question: item.question,
      description: item.description,
      options: [item.answerCorrect, item.answerFalse1, item.answerFalse2],
      correctAnswer: 0,
    }))

    const data: IUpdateWeekRequest = {
      id: weekID,
      course: JSON.stringify({ id }),
      ...(cover && { cover }),
      ...(titleCover && { titleCover }),
      ...(questionsForRequest &&
        questionsForRequest.length > 0 && { questions: JSON.stringify(questionsForRequest) }),
      ...values,
    }

    await updateWeekMutation.mutateAsync(data)
  }

  const onClose = () => {
    form.resetFields()
    setWeekID(null)
    closeDrawer()
  }

  return {
    onFinish,
    isLoading: updateWeekMutation.isPending || isFetching || isDataLoading,
    onClose,
    initialValues,
  }
}
