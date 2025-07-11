import { FC } from 'react'
import { formTypeMap } from '../constants'
import { EFormType } from '../enums'

interface IAuthFormProps {
  type: EFormType
}

export const AuthForm: FC<IAuthFormProps> = ({ type }) => {
  return <>{formTypeMap[type]}</>
}
