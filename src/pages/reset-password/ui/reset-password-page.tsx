import { AuthForm, EFormType, AuthWrapper } from '~/modules'

const ResetPasswordPage = () => {
  return (
    <AuthWrapper>
      <AuthForm type={EFormType.RESET_PASS} />
    </AuthWrapper>
  )
}

export default ResetPasswordPage
