import { Drawer as AntdDrawer, DrawerProps } from 'antd'
import classNames from 'classnames'
import { FC, ReactElement } from 'react'
import { useDrawerContext, useDrawerElement } from '../hooks'
import cls from './drawer.module.scss'

type IDrawerElement = ReactElement<{ drawerKey: string }>

type IElement = () => IDrawerElement

interface IDrawerProps extends DrawerProps {
  className?: string
  elements: IElement[]
}

export const Drawer: FC<IDrawerProps> = ({ elements, className, ...props }) => {
  const { isOpen, drawerKey } = useDrawerContext()

  const components = elements.map((element) => element())

  const component = useDrawerElement(drawerKey, components)

  return (
    <AntdDrawer
      open={isOpen}
      className={classNames(cls.drawer, [className])}
      closeIcon={null}
      {...props}
      width={464}
      destroyOnClose
    >
      {component}
    </AntdDrawer>
  )
}
