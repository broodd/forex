import { FC } from 'react'
import classNames from 'classnames'
import { Tabs as AntdTabs, TabsProps } from 'antd'
import cls from './tabs.module.scss'

interface ITabsProps extends TabsProps {
  className?: string
}

export const Tabs: FC<ITabsProps> = ({ className, ...props }) => {
  return <AntdTabs className={classNames(cls.tabs, [className])} {...props} />
}
