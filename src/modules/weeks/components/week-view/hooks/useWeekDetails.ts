import { useQuery } from '@tanstack/react-query'
import { getWeek } from '~/lib/api/services/weeks'

import { QueryKeys } from '~/lib/api/types'
import { useWeeksStore } from '~/modules/weeks/store'

export const useWeekDetails = () => {
  const { weekID } = useWeeksStore()

  const {
    data: week,
    isFetching,
    isLoading: isDataLoading,
  } = useQuery({
    queryKey: [QueryKeys.GET_WEEKS_DETAILS, weekID],
    queryFn: () => getWeek(weekID || ''),
    enabled: !!weekID,
  })

  return { week, isLoading: isFetching || isDataLoading }
}
