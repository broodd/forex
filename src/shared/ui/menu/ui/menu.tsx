import { FC } from 'react'
import classNames from 'classnames'
import { Menu as AntdMenu, MenuProps } from 'antd'

import cls from './menu.module.scss'

interface IMenuProps extends MenuProps {
  className?: string
}

export const Menu: FC<IMenuProps> = ({ className, ...props }) => {
  return <AntdMenu className={classNames(cls.wrapper, [className])} {...props} />
}
