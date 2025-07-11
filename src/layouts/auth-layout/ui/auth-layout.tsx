import { FC, ReactNode } from 'react'
import classNames from 'classnames'
import cls from './auth-layout.module.scss'

interface IAuthLayoutProps {
  className?: string
  children?: ReactNode
}

export const AuthLayout: FC<IAuthLayoutProps> = ({ className, children }) => {
  return <div className={classNames(cls.wrapper, [className])}>{children}</div>
}
