import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { createCourse } from '~/lib/api/services'
import { message } from '~/shared/utils/antd-static-functions'
import { ICreateCourseFormValues } from '../types'
import { ICreateCourseRequest, IErrorResponseData, QueryKeys } from '~/lib/api/types'
import { FormInstance } from 'antd'
import { AxiosError } from 'axios'

export const useCreateCourse = (
  closeDrawer: () => void,
  form: FormInstance<ICreateCourseFormValues>,
) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const createCourseMutation = useMutation({
    mutationFn: createCourse,
    onSuccess: async () => {
      message.success(t('NOTIFICATION.COURSE_CREATED'))
      form.resetFields()
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_COURSES] })
      closeDrawer()
    },
    onError: async (error: AxiosError<IErrorResponseData>) => {
      message.error(error.response?.data.message)
    },
  })

  const onFinish = async ({
    price,
    coverPlaceholder,
    bannerCover,
    ...values
  }: ICreateCourseFormValues) => {
    if (!values.cover) {
      return message.error(t('NOTIFICATION.IMAGE_REQUIRED'))
    }

    const data: ICreateCourseRequest = {
      price: Number(price),
      ...(coverPlaceholder && { coverPlaceholder }),
      ...(bannerCover && { bannerCover }),
      ...values,
    }

    await createCourseMutation.mutateAsync(data)
  }
  return { onFinish, isLoading: createCourseMutation.isPending }
}
