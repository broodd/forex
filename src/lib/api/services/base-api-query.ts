import axios, { AxiosInstance } from 'axios'
import qs from 'qs'
import i18n from '~/i18n'

import { message } from '~/shared/utils/antd-static-functions'

export class BaseApiQuery {
  loader: AxiosInstance
  jwtAuthInterceptor: number | null
  jwtRefreshInterceptor: number | null
  errorHandlerInterceptor: number | null
  isRefreshing: boolean
  refreshSubscribers: Array<(token: string) => void>

  constructor() {
    // Setup defaults
    this.loader = axios.create({
      paramsSerializer: {
        serialize: (params) => qs.stringify(params),
      },
    })
    this.loader.defaults.baseURL = import.meta.env.VITE_APP_API_URL

    // Interceptors
    this.jwtAuthInterceptor = null
    this.jwtRefreshInterceptor = null
    this.errorHandlerInterceptor = null

    // Flags and storages
    this.isRefreshing = false
    this.refreshSubscribers = []
  }

  enableAuth() {
    // if (this.jwtAuthInterceptor === null) {
    //   this.jwtAuthInterceptor = this.loader.interceptors.request.use((req) => {
    //     req.headers.Authorization = `Bearer ${storage.getFromStorage(TOKEN_KEY)}`
    //     return req
    //   })
    // }
    // if (this.jwtRefreshInterceptor === null) {
    //   this.jwtRefreshInterceptor = this.loader.interceptors.response.use(
    //     (res) => res,
    //     async (error) => {
    //       const prevRequest = error?.config
    //       if (error?.response?.status === 403 || error?.response?.status === 401) {
    //         const currentRefreshToken = storage.getFromStorage(REFRESH_TOKEN_KEY)
    //         if (typeof currentRefreshToken === 'string') {
    //           if (!this.isRefreshing) {
    //             this.isRefreshing = true
    //             refreshToken(currentRefreshToken)
    //               .then((newTokens) => {
    //                 storage.setToStorage(TOKEN_KEY, newTokens.token)
    //                 storage.setToStorage(REFRESH_TOKEN_KEY, newTokens.refreshToken)
    //                 this.isRefreshing = false
    //                 this.onRefreshed(newTokens.token)
    //               })
    //               .catch((error: AxiosError) => {
    //                 if (error.response?.status) {
    //                   // User not found. Make logout
    //                   storage.removeFromStorage(TOKEN_KEY)
    //                   storage.removeFromStorage(REFRESH_TOKEN_KEY)
    //                   window.location.href = ROUTES.SIGN_IN.getPath()
    //                 }
    //               })
    //           }
    //           return new Promise((resolve) => {
    //             this.subscribeTokenRefresh((token) => {
    //               prevRequest.headers.Authorization = `Bearer ${token}`
    //               resolve(axios(prevRequest))
    //             })
    //           })
    //         } else {
    //           storage.removeFromStorage(TOKEN_KEY)
    //           storage.removeFromStorage(REFRESH_TOKEN_KEY)
    //           window.location.href = ROUTES[ERoutes.SIGN_IN].getPath()
    //         }
    //       }
    //       return Promise.reject(error)
    //     },
    //   )
    // }
    return this
  }

  disableAuth() {
    if (this.jwtAuthInterceptor !== null) {
      this.loader.interceptors.request.eject(this.jwtAuthInterceptor)
      this.jwtAuthInterceptor = null
    }

    if (this.jwtRefreshInterceptor !== null) {
      this.loader.interceptors.response.eject(this.jwtRefreshInterceptor)
      this.jwtRefreshInterceptor = null
    }

    return this
  }

  enableErrorHandler() {
    if (this.errorHandlerInterceptor === null) {
      this.errorHandlerInterceptor = this.loader.interceptors.response.use(
        (res) => res,
        async (error) => {
          if (error?.response?.status === 400 && Array.isArray(error?.response?.data?.message)) {
            error.response.data.message.forEach((errorCode: string) => {
              message.error(i18n?.t ? i18n.t(`ERRORS.${errorCode}`) : errorCode, 5)
            })
          }

          return Promise.reject(error)
        },
      )
    }

    return this
  }

  disableErrorHandler() {
    if (this.errorHandlerInterceptor !== null) {
      this.loader.interceptors.response.eject(this.errorHandlerInterceptor)
      this.errorHandlerInterceptor = null
    }

    return this
  }

  subscribeTokenRefresh(cb: (token: string) => void) {
    this.refreshSubscribers.push(cb)
  }

  onRefreshed(token: string) {
    this.refreshSubscribers.map((cb) => cb(token))
  }

  build() {
    return this.loader
  }
}

export const queryBuilder = new BaseApiQuery()
