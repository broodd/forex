import { useQuery } from '@tanstack/react-query'
import { getCourse } from '~/lib/api/services'
import { QueryKeys } from '~/lib/api/types'
import { useCoursesStore } from '~/modules/courses/store'

export const useCourseDetails = () => {
  const { courseID } = useCoursesStore()

  const {
    data: course,
    isFetching,
    isLoading: isDataLoading,
  } = useQuery({
    queryKey: [QueryKeys.GET_COURSE_DETAILS, courseID],
    queryFn: () => getCourse(courseID || ''),
    enabled: !!courseID,
  })

  return { course, isLoading: isFetching || isDataLoading }
}
