import { FC } from 'react'
import classNames from 'classnames'
import cls from './heading.module.scss'
import { Title } from '~/shared/ui/title'
import { BackBtn } from '../../back-btn'

interface IHeadingProps {
  className?: string
  title?: string | null
  withBackBtn?: boolean
  customBackBtn?: React.ReactNode
  to?: string | number
}

export const Heading: FC<IHeadingProps> = ({
  className,
  title,
  withBackBtn,
  to,
  customBackBtn,
}) => {
  return (
    <div className={classNames(cls.wrapper, [className])}>
      {withBackBtn ? (
        <BackBtn title={title} to={to} custom={customBackBtn && customBackBtn} />
      ) : (
        <Title level={2} className={cls.title}>
          {title}
        </Title>
      )}
    </div>
  )
}
