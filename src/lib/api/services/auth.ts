import {
  IProfile,
  IResetPasswordRequest,
  ISignInRequest,
  ISignInResponse,
  IValidateEmailRequest,
} from '../types'
import { queryBuilder } from './base-api-query'

export const signIn = async (params: ISignInRequest): Promise<ISignInResponse> => {
  if (params.email === 'ftech@gmail.com' && params.password === 'Comarylein@$2')
    return { result: true }
  return { result: false }
}

export const refreshToken = async (refreshToken: string): Promise<ISignInResponse> => {
  const loader = queryBuilder.disableAuth().enableErrorHandler().build()
  const response = await loader.post('auth/refresh-tokens', { refreshToken })
  return response.data
}

export const logout = async (refreshToken: string): Promise<void> => {
  const loader = queryBuilder.disableAuth().enableErrorHandler().build()
  const response = await loader.post('auth/log-out ', { refreshToken })
  return response.data
}

export const resetPasswordSendEmail = async (email: string): Promise<void> => {
  const loader = queryBuilder.disableAuth().enableErrorHandler().build()
  const response = await loader.post('auth/reset-password/send/email', { email })
  return response.data
}

export const resetPassword = async (data: IResetPasswordRequest): Promise<IProfile> => {
  const loader = queryBuilder.disableAuth().enableErrorHandler().build()
  const response = await loader.post('auth/reset-password', { ...data })
  return response.data
}

export const validateEmail = async (data: IValidateEmailRequest): Promise<void> => {
  const loader = queryBuilder.disableAuth().enableErrorHandler().build()
  const response = await loader.post('auth/validate/email/code', { ...data })
  return response.data
}
