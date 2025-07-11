import { FC } from 'react'
import classNames from 'classnames'
import { Badge as AntdBadge, BadgeProps } from 'antd'
import { PresetStatusColorType } from 'antd/es/_util/colors'

import cls from './badge.module.scss'

export type TBadgeStatus = PresetStatusColorType

interface IBadgeProps extends BadgeProps {
  className?: string
  status?: TBadgeStatus
}

export const Badge: FC<IBadgeProps> = ({ className, ...props }) => {
  return <AntdBadge className={classNames(cls.wrapper, [className])} {...props} />
}
