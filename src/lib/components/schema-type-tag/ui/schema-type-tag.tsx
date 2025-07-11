import { FC } from 'react'
import i18n from '~/i18n'
import { ESchemaType } from '~/lib/api/types'
import { Tag } from '~/shared/ui/tag'
import cls from './schema-type-tag.module.scss'

interface ISchemaTypeTagProps {
  type: ESchemaType
}

const colorMap = {
  [ESchemaType.CHALLENGE]: 'purple',
  [ESchemaType.COURSE]: 'blue',
  [ESchemaType.BONUS]: 'purple',
  [ESchemaType.WEEK]: 'blue',
}

const labelMap = {
  [ESchemaType.CHALLENGE]: i18n.t('ACTIONS.COURSE_TYPE.CHALLENGE'),
  [ESchemaType.COURSE]: i18n.t('ACTIONS.COURSE_TYPE.COURSE'),
  [ESchemaType.BONUS]: i18n.t('ACTIONS.COURSE_TYPE.BONUS'),
  [ESchemaType.WEEK]: i18n.t('ACTIONS.COURSE_TYPE.WEEK'),
}

export const SchemaTypeTag: FC<ISchemaTypeTagProps> = ({ type }) => {
  return (
    <Tag color={colorMap[type]} bordered={false} round className={cls.tag}>
      {labelMap[type]}
    </Tag>
  )
}
