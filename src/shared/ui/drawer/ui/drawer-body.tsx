import { FC, ReactNode } from 'react'
import classNames from 'classnames'
import cls from './drawer.module.scss'

interface IDrawerBodyProps {
  className?: string
  children: ReactNode
}

export const DrawerBody: FC<IDrawerBodyProps> = ({ className, children }) => {
  return <div className={classNames(cls.drawer_body, [className])}>{children}</div>
}
