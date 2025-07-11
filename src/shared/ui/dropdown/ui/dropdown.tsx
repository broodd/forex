import { FC } from 'react'
import classNames from 'classnames'
import { Dropdown as AntdDropdown, DropdownProps } from 'antd'

import cls from './dropdown.module.scss'

interface IDropdownProps extends DropdownProps {
  className?: string
}

export const Dropdown: FC<IDropdownProps> = ({ className, children, ...props }) => {
  return (
    <AntdDropdown className={classNames(cls.wrapper, [className])} {...props}>
      {children}
    </AntdDropdown>
  )
}
