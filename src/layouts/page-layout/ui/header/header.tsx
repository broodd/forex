import classNames from 'classnames'
import { FC, ReactNode } from 'react'
import cls from './header.module.scss'
import { Heading } from '~/lib/components'

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
          <div className={cls.headingAttention}>
            <span className={cls.feedback}>Share your feedback</span>
            or switch back here. Heads up! V2 will reach
            <b>end of life on Oct 1st, 2025.</b>
          </div>
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
