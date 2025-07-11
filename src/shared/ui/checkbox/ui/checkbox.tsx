import { FC } from 'react'
import { Checkbox as AntdCheckbox, CheckboxProps } from 'antd'
import classNames from 'classnames'
import cls from './checkbox.module.scss'

interface ICheckboxProps extends CheckboxProps {
  className?: string
}

export const Checkbox: FC<ICheckboxProps> = ({ className, ...props }) => {
  return <AntdCheckbox className={classNames(cls.checkbox, [className])} {...props} />
}
