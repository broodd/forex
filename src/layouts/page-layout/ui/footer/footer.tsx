import { FC, ReactNode } from 'react'
import classNames from 'classnames'

import cls from './footer.module.scss'

export interface IFooterProps {
  className?: string
  children: ReactNode
}

export const Footer: FC<IFooterProps> = ({ className, children }) => {
  return <div className={classNames(cls.wrapper, [className])}>{children}</div>
}
