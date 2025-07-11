import { FC } from 'react'
import { DatePicker } from 'antd'
import classNames from 'classnames'
import { RangePickerProps } from 'antd/es/date-picker'
import cls from './interval-picker.module.scss'

const { RangePicker } = DatePicker
type TDatePickerProps = RangePickerProps & { className?: string }

export const IntervalPicker: FC<TDatePickerProps> = ({ className, ...props }) => {
  return (
    <RangePicker
      className={classNames(cls.intervalPicker, [className])}
      {...props}
      format='DD MMM, YYYY'
      separator={<span>-</span>}
    />
  )
}
