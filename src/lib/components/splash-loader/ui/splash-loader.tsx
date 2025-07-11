import classNames from 'classnames'
import { FC } from 'react'

import { SplashIcon } from '~/shared/ui/icon'
import cls from './splash-loader.module.scss'

interface IPageLoaderProps {
  className?: string
  spinning?: boolean
  fullHeight?: boolean
}

export const SplashLoader: FC<IPageLoaderProps> = ({ className, fullHeight = false }) => {
  return (
    <div className={classNames(cls.wrapper, { [cls.fullHeight]: fullHeight }, [className])}>
      <SplashIcon />
    </div>
  )
}
