import { AuthForm, EFormType, AuthWrapper } from '~/modules'

const SuccessResetPage = () => {
  return (
    <AuthWrapper>
      <AuthForm type={EFormType.SUCCESS_RESET} />
    </AuthWrapper>
  )
}

export default SuccessResetPage
