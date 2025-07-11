import { FC } from 'react'
import i18n from '~/i18n'
import { ECourseStatus } from '~/lib/api/types'
import { Tag } from '~/shared/ui/tag'

interface ICourseStatusTagProps {
  status: ECourseStatus
}

const colorMap = {
  [ECourseStatus.DONE]: 'green',
  [ECourseStatus.IN_PROGRESS]: 'blue',
  [ECourseStatus.NOT_AVAILABLE]: 'geekblue',
  [ECourseStatus.WAITING_TO_START]: 'yellow',
}

const labelMap = {
  [ECourseStatus.DONE]: i18n.t('ACTIONS.COURSE_STATUS.DONE'),
  [ECourseStatus.IN_PROGRESS]: i18n.t('ACTIONS.COURSE_STATUS.IN_PROGRESS'),
  [ECourseStatus.NOT_AVAILABLE]: i18n.t('ACTIONS.COURSE_STATUS.NOT_AVAILABLE'),
  [ECourseStatus.WAITING_TO_START]: i18n.t('ACTIONS.COURSE_STATUS.WAITING_TO_START'),
}

export const CourseStatusTag: FC<ICourseStatusTagProps> = ({ status }) => {
  return <Tag color={colorMap[status]}>{labelMap[status]}</Tag>
}
