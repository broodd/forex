import { AuthForm, EFormType, AuthWrapper } from '~/modules'

const SignInPage = () => {
  return (
    <AuthWrapper>
      <AuthForm type={EFormType.SIGN_IN} />
    </AuthWrapper>
  )
}

export default SignInPage
