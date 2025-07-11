import { FC } from 'react'
import { Tooltip as AntdTooltip, TooltipProps } from 'antd'
import classNames from 'classnames'

import cls from './tooltip.module.scss'

type TTooltipProps = TooltipProps & { className?: string }

export const Tooltip: FC<TTooltipProps> = ({ className, children, ...props }) => {
  return (
    <AntdTooltip className={classNames(cls.tooltip, [className])} {...props}>
      {children}
    </AntdTooltip>
  )
}
