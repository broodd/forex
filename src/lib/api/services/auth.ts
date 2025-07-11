import {
  IProfile,
  IResetPasswordRequest,
  ISignInRequest,
  ISignInResponse,
  ISignUpConfirmationRequest,
  IValidateEmailRequest,
} from '../types'
import { queryBuilder } from './base-api-query'

export const signIn = async (params: ISignInRequest): Promise<ISignInResponse> => {
  if (params.email === 'admin@gmail.com' && params.password === 'Password1') return { result: true }
  return { result: false }
}

export const signUp = async (params: ISignUpConfirmationRequest): Promise<IProfile> => {
  const loader = queryBuilder.disableAuth().enableErrorHandler().build()
  const response = await loader.post('auth/signup-confirmation', { ...params })
  return response.data
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

export const getProfile = async (): Promise<IProfile> => {
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.get('auth/profile')

  return response.data
}
