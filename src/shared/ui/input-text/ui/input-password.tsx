import classNames from 'classnames'
import { FC } from 'react'
import { Input as AntdInput, InputProps } from 'antd'

import cls from './input-password.module.scss'
import { NotVisibleIcon, VisibleIcon } from '../../icon'

interface IInputPasswordProps extends InputProps {
  className?: string
}

export const InputPassword: FC<IInputPasswordProps> = ({ className, ...props }) => {
  return (
    <AntdInput.Password
      className={classNames(cls.wrapper, [className])}
      {...props}
      iconRender={(visible) =>
        visible ? (
          <VisibleIcon style={{ fontSize: 24 }} />
        ) : (
          <NotVisibleIcon style={{ fontSize: 24 }} />
        )
      }
    />
  )
}
