import { Spin as AntdSpin, SpinProps } from 'antd'
import classNames from 'classnames'
import { FC } from 'react'

import cls from './spin.module.scss'

interface ISpinProps extends SpinProps {
  className?: string
  // showProgress?: boolean
}

export const Spin: FC<ISpinProps> = ({ className, children, ...props }) => {
  return (
    <AntdSpin
      className={classNames(cls.spin, [className])}
      wrapperClassName={classNames(cls.wrapper, [className])}
      {...props}
    >
      {children}
    </AntdSpin>
  )
}
