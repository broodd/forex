import { FormInstance } from 'antd'
import { INotificationEditFormValues } from '../types'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNotificationsStore } from '../store'
import {
  ENotificationType,
  IErrorResponseData,
  IUpdateNotification,
  QueryKeys,
} from '~/lib/api/types'
import { getNotificationByType, updateNotification } from '~/lib/api/services'
import dayjs from 'dayjs'
import { message } from '~/shared/utils/antd-static-functions'
import { AxiosError } from 'axios'
import { useEffect } from 'react'

export const useNotificationEdit = (
  closeDrawer: () => void,
  form: FormInstance<INotificationEditFormValues>,
) => {
  const { notificationType, setNotificationType } = useNotificationsStore()
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const {
    data: notification,
    isFetching,
    isLoading: isDataLoading,
  } = useQuery({
    queryKey: [QueryKeys.GET_NOTIFICATION, notificationType],
    queryFn: () => getNotificationByType(notificationType as ENotificationType),
    enabled: !!notificationType,
  })

  useEffect(() => {
    form.resetFields()
  }, [form, notification])

  const initialValues: INotificationEditFormValues = notification
    ? {
        title: notification.title,
        body: notification.body,
        reminderTime: notification?.reminderTime
          ? dayjs(notification.reminderTime, 'HH')
          : undefined,
      }
    : {}

  const editNotificationMutation = useMutation({
    mutationFn: updateNotification,
    onSuccess: async () => {
      message.success(t('NOTIFICATION.NOTIFICATION_UPDATED'))
      form.resetFields()
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_NOTIFICATIONS] })
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_NOTIFICATION] })
      setNotificationType(null)
      closeDrawer()
    },
    onError: async (error: AxiosError<IErrorResponseData>) => {
      message.error(error.response?.data.message)
    },
  })

  const onFinish = async ({ body, reminderTime, title }: INotificationEditFormValues) => {
    const values = {
      ...(body && { body }),
      ...(reminderTime && { reminderTime: `${reminderTime.format('HH')}:00` }),
      ...(title && { title }),
    }

    const data: IUpdateNotification = {
      ...(notificationType &&
        notificationType === ENotificationType.WATER_REMINDER && {
          WATER_REMINDER: values,
        }),
      ...(notificationType &&
        notificationType === ENotificationType.STEPS_REMINDER && {
          STEPS_REMINDER: values,
        }),
    }

    await editNotificationMutation.mutateAsync(data)
  }

  return {
    initialValues,
    isLoading: isFetching || isDataLoading || editNotificationMutation.isPending,
    onFinish,
  }
}
