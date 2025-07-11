import { FC, ReactNode } from 'react'
import classNames from 'classnames'
import cls from './drawer.module.scss'

interface IDrawerCardProps {
  className?: string
  children: ReactNode
}

export const DrawerCard: FC<IDrawerCardProps> = ({ className, children }) => {
  return <div className={classNames(cls.drawer_card, [className])}>{children}</div>
}
