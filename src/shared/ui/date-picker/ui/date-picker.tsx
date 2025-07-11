import { FC } from 'react'
import { DatePicker as AntdDatePicker, DatePickerProps } from 'antd'
import classNames from 'classnames'

import cls from './date-picker.module.scss'

type TDatePickerProps = DatePickerProps & { className?: string }

export const DatePicker: FC<TDatePickerProps> = ({ className, ...props }) => {
  return <AntdDatePicker className={classNames(cls.picker, [className])} {...props} />
}
