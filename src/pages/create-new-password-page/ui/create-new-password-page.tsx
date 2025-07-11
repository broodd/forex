import { AuthForm, EFormType, AuthWrapper } from '~/modules'

const CreateNewPasswordPage = () => {
  return (
    <AuthWrapper>
      <AuthForm type={EFormType.CREATE_NEW_PASS} />
    </AuthWrapper>
  )
}

export default CreateNewPasswordPage
