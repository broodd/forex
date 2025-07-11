import { createContext } from 'react'

type DrawerContextType = {
  isOpen: boolean
  drawerKey: string
  openDrawer: (drawerKey: string) => void
  closeDrawer: () => void
}

export const DrawerContext = createContext<DrawerContextType | undefined>(undefined)
