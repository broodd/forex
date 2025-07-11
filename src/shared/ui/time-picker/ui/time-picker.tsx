import { FC } from 'react'
import { TimePicker as AntdTimePicker, TimePickerProps } from 'antd'
import classNames from 'classnames'

import cls from './time-picker.module.scss'

type TDatePickerProps = TimePickerProps & { className?: string }

export const TimePicker: FC<TDatePickerProps> = ({ className, ...props }) => {
  return <AntdTimePicker className={classNames(cls.picker, [className])} {...props} />
}
