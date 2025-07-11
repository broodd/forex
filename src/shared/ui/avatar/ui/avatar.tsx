import { FC } from 'react'
import classNames from 'classnames'

import { Avatar as AntdAvatar, AvatarProps } from 'antd'

import cls from './avatar.module.scss'

interface IAvatarProps extends AvatarProps {
  className?: string
}

export const Avatar: FC<IAvatarProps> = ({ className, ...props }) => {
  return <AntdAvatar className={classNames(cls.wrapper, [className])} {...props} />
}
