import { FC } from 'react'
import { Image as AntdImage, ImageProps } from 'antd'
import classNames from 'classnames'
import cls from './image.module.scss'

interface IImageProps extends ImageProps {
  className?: string
}

export const Image: FC<IImageProps> = ({ className, ...props }) => {
  return <AntdImage className={classNames(cls.wrapper, [className])} {...props} />
}
