import { FC } from 'react'

import { Input } from 'antd'
import { TextAreaProps } from 'antd/es/input/TextArea'

import classNames from 'classnames'

import cls from './textarea.module.scss'
import { Text } from '../../text/ui/text'
import { ETextSizes } from '../../text/types/enums'

interface ITextAreaProps extends TextAreaProps {
  className?: string
}

export const TextArea: FC<ITextAreaProps> = ({ className, showCount, ...props }) => {
  return (
    <Input.TextArea
      className={classNames(cls.textarea, { [cls.withCount]: showCount }, [className])}
      showCount={{
        formatter: (args: { value: string; count: number; maxLength?: number }) => (
          <Text size={ETextSizes.SFS} type='secondary'>{`${args.count}/${args.maxLength}`}</Text>
        ),
      }}
      {...props}
    />
  )
}
