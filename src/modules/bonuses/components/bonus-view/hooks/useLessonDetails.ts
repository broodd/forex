import { useQuery } from '@tanstack/react-query'
import { getLesson } from '~/lib/api/services/lessons'

import { QueryKeys } from '~/lib/api/types'
import { useLessonsStore } from '~/modules/lessons/store'

export const useLessonDetails = () => {
  const { lessonID } = useLessonsStore()

  const {
    data: lesson,
    isFetching,
    isLoading: isDataLoading,
  } = useQuery({
    queryKey: [QueryKeys.GET_LESSON_DETAILS, lessonID],
    queryFn: () => getLesson(lessonID || ''),
    enabled: !!lessonID,
  })

  return { lesson, isLoading: isFetching || isDataLoading }
}
