import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { resetPassword } from '~/lib/api/services'
import { EProfileRole, IResetPasswordRequest } from '~/lib/api/types'
import { ROUTES } from '~/lib/constants/routes'
import { message } from '~/shared/utils/antd-static-functions'
import { ICreateNewPasswordFormValues } from '../types'
import { FormInstance } from 'antd'

export const useCreateNewPassword = (form: FormInstance<ICreateNewPasswordFormValues>) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const email = location.state && location.state.email
  const code = location.state && location.state.code

  const handleConfirmPasswordValidator = async () => {
    const { confirm_password, new_password } = await form.getFieldsValue(true)
    const doThePasswordsMatch = new_password === confirm_password

    if (!doThePasswordsMatch) {
      return Promise.reject(t('FORM.VALIDATE_MESSAGES.INCORRECT_PASSWORD'))
    }

    return Promise.resolve()
  }

  const createPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: async (data) => {
      const isAdmin = data.role === EProfileRole.ADMIN
      message.success(t('NOTIFICATION.PASSWORD_CHANGED'))
      if (isAdmin) {
        navigate(ROUTES.SIGN_IN.getPath())
      } else {
        navigate(ROUTES.SUCCESS_RESET.getPath())
      }
    },
  })

  const onFinish = async ({ confirm_password, email, code }: ICreateNewPasswordFormValues) => {
    const data: IResetPasswordRequest = {
      email,
      code,
      password: confirm_password,
    }
    await createPasswordMutation.mutateAsync(data)
  }

  return { onFinish, handleConfirmPasswordValidator, email, code }
}
