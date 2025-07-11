import { FC } from 'react'
import classNames from 'classnames'
import AntdTitle, { TitleProps } from 'antd/es/typography/Title'
import cls from './title.module.scss'

interface ITitleProps extends TitleProps {
  className?: string
}

export const Title: FC<ITitleProps> = ({ className, children, ...props }) => {
  return (
    <AntdTitle className={classNames(cls.title, [className])} {...props}>
      {children}
    </AntdTitle>
  )
}
