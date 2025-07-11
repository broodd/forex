import { createContext, Dispatch, SetStateAction } from 'react'
import { IProfile } from '~/lib/api/types'

export interface IClientContextData {
  data: IProfile | null
  isClientLoaded: boolean
  isAuthorized: boolean
}

interface IClientContext {
  client: IClientContextData
  setClient: Dispatch<SetStateAction<IClientContextData>>
}

export const defaultState: IClientContext = {
  client: {
    data: null,
    isClientLoaded: false,
    isAuthorized: false,
  },
  setClient: () => {
    return {}
  },
}

const ClientContext = createContext<IClientContext>(defaultState)

export default ClientContext
