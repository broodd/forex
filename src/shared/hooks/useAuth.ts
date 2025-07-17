/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react'

import ClientContext from '~/shared/context/client-context'

export interface IAuthLogInParams {
  result: boolean
  token?: string
  refreshToken?: string
}

export const useAuth = () => {
  const { client, setClient } = useContext(ClientContext)

  const logIn = async (params: IAuthLogInParams) => {
    if (!params.result) return

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
