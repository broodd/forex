import { FC } from 'react'
import { Select as AntdSelect, SelectProps } from 'antd'

import classNames from 'classnames'

import cls from './select.module.scss'
import { ArrowDownIcon, CloseIcon } from '../../icon'

interface ISelectProps extends SelectProps {
  className?: string
}

export const Select: FC<ISelectProps> = ({ className, ...props }) => {
  return (
    <AntdSelect
      className={classNames(cls.select, [className])}
      suffixIcon={<ArrowDownIcon style={{ fontSize: 24, pointerEvents: 'none' }} />}
      allowClear={{ clearIcon: <CloseIcon style={{ fontSize: 22, pointerEvents: 'none' }} /> }}
      {...props}
    />
  )
}
