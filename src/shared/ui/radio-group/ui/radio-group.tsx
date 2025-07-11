import { FC } from 'react'
import { Radio as AntdRadio, RadioGroupProps } from 'antd'
import classNames from 'classnames'

import cls from './radio-group.module.scss'
import { ERadioDirection } from '../types/enums'

interface IRadioGroupProps extends RadioGroupProps {
  isCustom?: boolean
  className?: string
  direction?: ERadioDirection
}

export const RadioGroup: FC<IRadioGroupProps> = ({
  className,
  children,
  isCustom,
  direction = ERadioDirection.HORIZONTAL,
  ...props
}) => {
  return (
    <AntdRadio.Group
      className={classNames(
        cls.wrapper,
        { [cls.custom]: Boolean(isCustom), [cls.vertical]: direction === ERadioDirection.VERTICAL },
        [className],
      )}
      {...props}
    >
      {children}
    </AntdRadio.Group>
  )
}
