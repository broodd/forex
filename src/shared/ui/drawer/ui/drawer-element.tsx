import { ReactNode } from 'react'

interface IProps {
  drawerKey: string
  children: ReactNode
}

export const DrawerElement = ({ children }: IProps) => children
