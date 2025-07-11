import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { IErrorResponseData, IProfile, QueryKeys } from '~/lib/api/types'

import { getProfile } from '~/lib/api/services'
import ClientContext from '~/shared/context/client-context'
import storage, { REFRESH_TOKEN_KEY, TOKEN_KEY } from '~/shared/utils/storage'
import { message } from '../utils/antd-static-functions'

export interface IAuthLogInParams {
  token: string
  refreshToken: string
}

export const useAuth = () => {
  const { t } = useTranslation()
  const { client, setClient } = useContext(ClientContext)
  const currentSessionToken = storage.getFromStorage(TOKEN_KEY)
  const currentRefreshToken = storage.getFromStorage(REFRESH_TOKEN_KEY)

  const {
    refetch: reloadClient,
    isError,
    isSuccess,
    data: profile,
    error,
  } = useQuery<IProfile, AxiosError<IErrorResponseData>>({
    queryKey: [QueryKeys.GET_PROFILE],
    queryFn: getProfile,
    enabled: !!currentSessionToken && !!currentRefreshToken && !client.isClientLoaded,
    refetchOnMount: false,
  })

  const logIn = async (params: IAuthLogInParams) => {
    storage.setToStorage(TOKEN_KEY, params.token)
    storage.setToStorage(REFRESH_TOKEN_KEY, params.refreshToken)
    await reloadClient()
  }

  const logOut = () => {
    setClient((prevState) => {
      return {
        ...prevState,
        data: null,
        isClientLoaded: true,
        isAuthorized: false,
      }
    })

    storage.removeFromStorage(TOKEN_KEY)
    storage.removeFromStorage(REFRESH_TOKEN_KEY)
  }

  useEffect(() => {
    if (isSuccess || profile) {
      setClient((prevState) => {
        return {
          ...prevState,
          data: profile,
          isClientLoaded: true,
          isAuthorized: true,
        }
      })
    }
  }, [isSuccess, profile, setClient])

  useEffect(() => {
    if (isError) {
      message.error(t(`ERRORS.${error.response?.data.message[0]}`))
      setClient((prevState) => ({
        ...prevState,
        data: null,
        isClientLoaded: true,
        isAuthorized: false,
      }))
      logOut()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError])

  // Set client is loaded and not authorized, if no sessionToken in storage
  useEffect(() => {
    if (!currentSessionToken && !client.isClientLoaded) {
      setClient((prevState) => {
        return {
          ...prevState,
          data: null,
          isClientLoaded: true,
          isAuthorized: false,
        }
      })
    }
  }, [currentSessionToken, client.isClientLoaded, setClient])

  return { client, setClient, logIn, logOut, reloadClient }
}
