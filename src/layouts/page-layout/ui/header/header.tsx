import classNames from 'classnames'
import { FC, ReactNode } from 'react'
import { Heading } from '~/lib/components'
import cls from './header.module.scss'

export interface IHeaderProps {
  className?: string
  title?: string
  description?: string
  extra?: ReactNode
  children?: ReactNode
  backBtn?: boolean
  customBackBtn?: React.ReactNode
}

export const Header: FC<IHeaderProps> = ({ className, title, backBtn, extra, customBackBtn }) => {
  return (
    <div className={classNames(cls.wrapper, [className])}>
      <div className={cls.content}>
        <div className={cls.headingContent}>
          {title && (
            <Heading
              title={title}
              withBackBtn={backBtn}
              customBackBtn={customBackBtn && customBackBtn}
            />
          )}
        </div>
        {extra && <div className={cls.extra}>{extra}</div>}
      </div>
    </div>
  )
}
