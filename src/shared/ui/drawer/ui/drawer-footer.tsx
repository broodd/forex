import { FC, ReactNode } from 'react'
import classNames from 'classnames'
import cls from './drawer.module.scss'

interface IDrawerFooterProps {
  className?: string
  children: ReactNode
}

export const DrawerFooter: FC<IDrawerFooterProps> = ({ className, children }) => {
  return <div className={classNames(cls.drawer_footer, [className])}>{children}</div>
}
