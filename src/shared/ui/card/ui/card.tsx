import { FC } from 'react'
import { Card as AntdCard, CardProps } from 'antd'
import classNames from 'classnames'
import cls from './card.module.scss'

interface ICardProps extends CardProps {
  className?: string
}

export const Card: FC<ICardProps> = ({ className, children, ...props }) => {
  return (
    <AntdCard className={classNames(cls.wrapper, [className])} {...props}>
      {children}
    </AntdCard>
  )
}
