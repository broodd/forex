import { AuthForm, EFormType, AuthWrapper } from '~/modules'

const AccessCodePage = () => {
  return (
    <AuthWrapper>
      <AuthForm type={EFormType.ACCESS_CODE} />
    </AuthWrapper>
  )
}

export default AccessCodePage
