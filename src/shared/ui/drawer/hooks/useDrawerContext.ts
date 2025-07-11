import { useContext } from 'react'
import { DrawerContext } from '../ui/drawer-context'

export const useDrawerContext = () => {
  const context = useContext(DrawerContext)

  if (!context) {
    throw new Error('You should use useDrawer into DrawerProvider')
  }
  return context
}
