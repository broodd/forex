import { Layout } from 'antd'
import classNames from 'classnames'
import { FC, ReactNode, useState } from 'react'
import { CollapseBtn, Sidebar } from '../components'
import cls from './main-layout.module.scss'

const { Sider, Content } = Layout

interface IMainLayoutProps {
  className?: string
  children: ReactNode
}

export const MainLayout: FC<IMainLayoutProps> = ({ className, children }) => {
  const [collapsed, setCollapsed] = useState(true)
  return (
    <Layout className={classNames(cls.wrapper, [className])}>
      <Sider
        width={168}
        collapsedWidth={86}
        theme='light'
        className={cls.aside}
        collapsible
        collapsed={collapsed}
        trigger={null}
      >
        <Sidebar collapsed={collapsed} />
      </Sider>
      <div className={cls.dividerBox}>
        <CollapseBtn collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      <Content className={cls.main}>{children}</Content>
    </Layout>
  )
}
