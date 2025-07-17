import { SignInForm } from './components/sign-in-form/sign-in-form'
import { EFormType } from './enums'

export const formTypeMap = {
  [EFormType.SIGN_IN]: <SignInForm />,
}
