import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FormInstance } from 'antd'
import { useTranslation } from 'react-i18next'
import { getCourse, updateCourse } from '~/lib/api/services'
import { IErrorResponseData, IUpdateCourseRequest, QueryKeys } from '~/lib/api/types'
import { useCoursesStore } from '~/modules/courses/store'
import { message } from '~/shared/utils/antd-static-functions'
import { IEditCourseFormValues } from '../types'
import { useEffect } from 'react'
import { AxiosError } from 'axios'

export const useEditCourse = (
  closeDrawer: () => void,
  form: FormInstance<IEditCourseFormValues>,
) => {
  const { courseID, setCourseID } = useCoursesStore()
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const {
    data: course,
    isFetching,
    isLoading: isDataLoading,
  } = useQuery({
    queryKey: [QueryKeys.GET_COURSE_DETAILS, courseID],
    queryFn: () => getCourse(courseID || ''),
    enabled: !!courseID,
  })

  const editCourseMutation = useMutation({
    mutationFn: updateCourse,
    onSuccess: async () => {
      message.success(t('NOTIFICATION.COURSE_UPDATED'))
      form.resetFields()
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_COURSES] })
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_COURSE_DETAILS] })
      closeDrawer()
    },
    onError: async (error: AxiosError<IErrorResponseData>) => {
      message.error(error.response?.data.message)
    },
  })

  const initialValues = {
    cover: course?.cover,
    coverPlaceholder: course?.coverPlaceholder,
    price: Number(course?.price) ? course?.price : undefined,
    salePrice: Number(course?.salePrice) ? course?.salePrice : undefined,
    title: course?.title,
    type: course?.type,
    isVisible: course?.isVisible,
    description: course?.description,
    bannerCover: course?.bannerCover,
  }

  const onFinish = async ({
    price,
    cover,
    coverPlaceholder,
    bannerCover,
    ...values
  }: IEditCourseFormValues) => {
    if (!courseID) {
      return
    }
    const data: IUpdateCourseRequest = {
      id: courseID,
      price: Number(price),

      ...(coverPlaceholder && { coverPlaceholder }),

      ...(cover && { cover }),
      ...values,
      bannerCover: bannerCover ? bannerCover : 'null',
    }

    await editCourseMutation.mutateAsync(data)
  }

  const onClose = () => {
    form.resetFields()
    setCourseID(null)
    closeDrawer()
  }

  useEffect(() => form.resetFields(), [courseID, form])
  return {
    onFinish,
    isLoading: editCourseMutation.isPending || isFetching || isDataLoading,
    initialValues,
    onClose,
  }
}
