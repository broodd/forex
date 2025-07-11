import { FC } from 'react'
import classNames from 'classnames'
import { Tag as AntdTag, TagProps } from 'antd'

import cls from './tag.module.scss'

export interface ITagProps extends TagProps {
  className?: string
  round?: boolean
}

export const Tag: FC<ITagProps> = ({ className, round = false, children, ...props }) => {
  const classes = classNames({
    [cls.tag]: true,
    [cls.round]: round,
    [className as string]: !!className,
  })

  return (
    <AntdTag className={classes} {...props}>
      {children}
    </AntdTag>
  )
}
