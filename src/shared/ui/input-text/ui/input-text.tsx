import classNames from 'classnames'
import { FC } from 'react'
import { Input as AntdInput, InputProps } from 'antd'

import cls from './input-text.module.scss'

interface IInputProps extends InputProps {
  className?: string
}

export const InputText: FC<IInputProps> = ({ className, ...props }) => {
  return <AntdInput className={classNames(cls.wrapper, [className])} {...props} />
}
