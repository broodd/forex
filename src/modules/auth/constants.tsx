import { AccessCodeForm } from './components/access-code-form/access-code-form'
import { CreateNewPasswordForm } from './components/create-new-password-form/create-new-password-form'
import { ResetPasswordForm } from './components/reset-password-form/reset-password-form'
import { SignInForm } from './components/sign-in-form/sign-in-form'
import { SuccessResetScreen } from './components/success-reset-screen/success-reset-screen'
import { EFormType } from './enums'

export const formTypeMap = {
  [EFormType.SIGN_IN]: <SignInForm />,
  [EFormType.RESET_PASS]: <ResetPasswordForm />,
  [EFormType.ACCESS_CODE]: <AccessCodeForm />,
  [EFormType.CREATE_NEW_PASS]: <CreateNewPasswordForm />,
  [EFormType.SUCCESS_RESET]: <SuccessResetScreen />,
}
