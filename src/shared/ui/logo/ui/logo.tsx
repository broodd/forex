import { FC } from 'react'
import classNames from 'classnames'

import cls from './logo.module.scss'

interface ILogoProps {
  className?: string
  collapsed?: boolean
}

export const Logo: FC<ILogoProps> = ({ className, collapsed = false }) => {
  return (
    <div className={classNames(cls.wrapper, [className])}>
      {collapsed ? <div className={cls.logo}></div> : <div className={cls.logo_full}></div>}
    </div>
  )
}
