/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect } from 'react'

import ClientContext from '~/shared/context/client-context'
import storage, { TOKEN_KEY } from '../utils/storage'

export interface IAuthLogInParams {
  result: boolean
  token?: string
  refreshToken?: string
}

export const useAuth = () => {
  const { client, setClient } = useContext(ClientContext)
  const currentToken = storage.getFromStorage(TOKEN_KEY)

  useEffect(() => {
    setClient((prevState: any) => {
      return {
        ...prevState,
        data: currentToken ? {} : null,
        isClientLoaded: true,
        isAuthorized: !!currentToken,
      }
    })
  }, [currentToken, setClient])

  const logIn = async (params: IAuthLogInParams) => {
    if (!params.result) return

    storage.setToStorage(TOKEN_KEY, 'true')

    setClient((prevState: any) => {
      return {
        ...prevState,
        data: {},
        isSuper: true,
        isClientLoaded: true,
        isAuthorized: true,
      }
    })
  }

  return { client, setClient, logIn }
}
