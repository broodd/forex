import React, { ReactNode } from 'react'

export const useDrawerElement = (drawerKey: string, components: ReactNode) => {
  const component = React.Children.toArray(components).find(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    (child) => React.isValidElement(child) && child.props.drawerKey === drawerKey,
  )

  return component
}
