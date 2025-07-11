import { FC } from 'react'
import AntdParagraph, { ParagraphProps } from 'antd/es/typography/Paragraph'
import classNames from 'classnames'
import cls from './paragraph.module.scss'

interface IParagraphProps extends ParagraphProps {
  className?: string
}

export const Paragraph: FC<IParagraphProps> = ({ className, children, ...props }) => {
  return (
    <AntdParagraph className={classNames(cls.wrapper, [className])} {...props}>
      {children}
    </AntdParagraph>
  )
}
