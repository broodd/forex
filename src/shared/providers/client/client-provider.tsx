import { FC, ReactNode, useState } from 'react'
import ClientContext, { defaultState, IClientContextData } from '~/shared/context/client-context'

interface IClientProviderProps {
  children: ReactNode
}

export const ClientProvider: FC<IClientProviderProps> = ({ children }) => {
  const [client, setClient] = useState<IClientContextData>(defaultState.client)

  return <ClientContext.Provider value={{ client, setClient }}>{children}</ClientContext.Provider>
}
