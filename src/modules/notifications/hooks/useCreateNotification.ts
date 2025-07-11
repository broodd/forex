import { FormInstance } from 'antd'
import { INotificationCreationFormValues } from '../types'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNotification } from '~/lib/api/services'
import { message } from '~/shared/utils/antd-static-functions'
import { ICreateCustomNotificationRequest, IErrorResponseData, QueryKeys } from '~/lib/api/types'
import { AxiosError } from 'axios'

export const useCreateNotification = (
  closeDrawer: () => void,
  form: FormInstance<INotificationCreationFormValues>,
) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const createNotificationMutation = useMutation({
    mutationFn: createNotification,
    onSuccess: async () => {
      message.success(t('NOTIFICATION.NOTIFICATION_CREATED'))
      form.resetFields()
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_NOTIFICATIONS] })
      closeDrawer()
    },
    onError: async (error: AxiosError<IErrorResponseData>) => {
      message.error(error.response?.data.message)
    },
  })

  const onFinish = async ({
    body,
    image,
    reminderTime,
    date,
    ...values
  }: INotificationCreationFormValues) => {
    const data: ICreateCustomNotificationRequest = {
      ...(body && { body }),
      ...(image && { image }),
      ...(reminderTime && { reminderTime: `${reminderTime.format('HH')}:00` }),
      ...(date && date[1] && { endDate: date[1].toISOString() }),
      ...(date && date[0] && { startDate: date[0].toISOString() }),
      ...values,
    }

    await createNotificationMutation.mutateAsync(data)
  }

  return { onFinish, isLoading: createNotificationMutation.isPending }
}
