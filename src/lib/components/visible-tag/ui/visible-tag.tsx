import { FC } from 'react'
import i18n from '~/i18n'
import { Tag } from '~/shared/ui/tag'

interface IVisibleTagProps {
  isVisible: boolean
}

export const VisibleTag: FC<IVisibleTagProps> = ({ isVisible }) => {
  return (
    <Tag color={isVisible ? 'green' : 'yellow'}>
      {isVisible ? i18n.t('ACTIONS.IS_VISIBLE') : i18n.t('ACTIONS.IS_NOT_VISIBLE')}
    </Tag>
  )
}
