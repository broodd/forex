import classNames from 'classnames'
import { FC, ReactNode } from 'react'
import cls from './auth-wrapper.module.scss'

interface IAuthWrapperProps {
  className?: string
  children?: ReactNode
}

export const AuthWrapper: FC<IAuthWrapperProps> = ({ className, children }) => {
  return (
    <div className={classNames(cls.wrapper, [className])}>
      <>{children}</>
    </div>
  )
}
