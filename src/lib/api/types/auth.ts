import { IFile } from './file'

export interface ISignInRequest {
  email: string
  password: string
}

export interface ISignInResponse {
  result: boolean
  // token: string
  // refreshToken: string
}

export interface IProfile {
  id: string
  createdAt: string
  updatedAt: string
  status: EProfileStatus
  role: EProfileRole
  name?: string | null
  description?: string | null
  email: string
  cover: IFile
  backgroudCover: IFile
  __posts_count?: string | null
  __followers_count?: string | null
  __followings_count?: string | null
  __is_followings?: boolean
  __is_viewed_stories?: boolean
}

export enum EProfileStatus {
  ACTIVATED = 'ACTIVATED',
  PENDING = 'PENDING',
}

export enum EProfileRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface ISignUpConfirmationRequest {
  email: string
  password: string
  temporaryPassword: string
}

export interface IResetPasswordSendEmailRequest {
  email: string
}

export interface IResetPasswordRequest {
  email: string
  password: string
  code: string
}

export interface IValidateEmailRequest {
  email: string
  code: string
}

export interface IUpdateProfileRequest {
  email: string
  name?: string
  password: string
  cover?: FormData
  backgroudCover?: FormData
}
