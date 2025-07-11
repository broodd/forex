import React, { ReactNode, useState } from 'react'
import { DrawerContext } from './drawer-context'

export const DrawerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [drawerKey, setKey] = useState('')

  const openDrawer = (drawerKey: string) => {
    setKey(drawerKey)
    setIsOpen(true)
  }

  const closeDrawer = () => {
    setIsOpen(false)
    setKey('')
  }

  return (
    <DrawerContext.Provider value={{ isOpen, drawerKey, openDrawer, closeDrawer }}>
      {children}
    </DrawerContext.Provider>
  )
}
