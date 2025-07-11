import { FC } from 'react'
import { Button as AntdButton, ButtonProps } from 'antd'
import classNames from 'classnames'

import cls from './button.module.scss'

interface IButtonProps extends ButtonProps {
  className?: string
  isAccent?: boolean
  isInverted?: boolean
}

export const Button: FC<IButtonProps> = ({
  className,
  children,
  isAccent = false,
  isInverted = false,
  ...props
}) => {
  return (
    <AntdButton
      htmlType='button'
      className={classNames(cls.button, { [cls.accent]: isAccent, [cls.inverted]: isInverted }, [
        className,
      ])}
      {...props}
    >
      {children}
    </AntdButton>
  )
}
