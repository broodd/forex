import { FC } from 'react'
import AntdText, { TextProps } from 'antd/es/typography/Text'
import classNames from 'classnames'
import cls from './text.module.scss'
import { ETextSizes } from '../types/enums'

interface ITextProps extends TextProps {
  className?: string
  size?: ETextSizes
}

export const Text: FC<ITextProps> = ({ className, children, size = ETextSizes.PGR, ...props }) => {
  return (
    <AntdText className={classNames(cls.text, [className, cls[size]])} {...props}>
      {children}
    </AntdText>
  )
}
