import { DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCourse } from '~/lib/api/services'
import { updateLesson } from '~/lib/api/services/lessons'
import { updateWeek } from '~/lib/api/services/weeks'
import {
  ICourse,
  ILesson,
  IUpdateCourseRequest,
  IUpdateLessonRequest,
  IUpdateWeekRequest,
  IWeek,
  QueryKeys,
} from '~/lib/api/types'

const mutationMap = {
  courses: updateCourse,
  weeks: updateWeek,
  lessons: updateLesson,
} as const

type MutationMap = typeof mutationMap

type MutationVariables<T extends keyof MutationMap> = T extends 'courses'
  ? IUpdateCourseRequest
  : T extends 'weeks'
    ? IUpdateWeekRequest
    : T extends 'lessons'
      ? IUpdateLessonRequest
      : never

type MutationResponse<T extends keyof MutationMap> = T extends 'courses'
  ? ICourse
  : T extends 'weeks'
    ? IWeek
    : T extends 'lessons'
      ? ILesson
      : never

export const useDrag = <T extends { id: string; position?: number }>(
  dataSource: readonly T[],
  type: keyof MutationMap,
) => {
  const queryClient = useQueryClient()
  const updatePosition = useMutation<
    MutationResponse<typeof type>,
    Error,
    MutationVariables<typeof type>
  >({
    mutationFn: mutationMap[type] as (
      variables: MutationVariables<typeof type>,
    ) => Promise<MutationResponse<typeof type>>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_COURSES] })
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_WEEKS] })
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_LESSONS] })
    },
  })
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const newPosition = dataSource.filter((item) => item.id === over?.id)[0].position
      updatePosition.mutate({ id: active.id as string, position: newPosition } as MutationVariables<
        typeof type
      >)
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
        distance: 1,
      },
    }),
  )

  return { onDragEnd, sensors }
}
