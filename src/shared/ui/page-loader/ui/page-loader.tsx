import { FC } from 'react'
import classNames from 'classnames'

import { Spin } from '~/shared/ui/spin'

import cls from './page-loader.module.scss'

interface IPageLoaderProps {
  className?: string
  spinning?: boolean
  fullHeight?: boolean
}

export const PageLoader: FC<IPageLoaderProps> = ({
  className,
  spinning = true,
  fullHeight = false,
}) => {
  return (
    <div className={classNames(cls.wrapper, { [cls.fullHeight]: fullHeight }, [className])}>
      <Spin spinning={spinning} />
    </div>
  )
}
