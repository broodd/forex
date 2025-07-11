import { useMutation } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { validateEmail } from '~/lib/api/services'
import { IValidateEmailRequest } from '~/lib/api/types'
import { ROUTES } from '~/lib/constants/routes'

export const useAccessCode = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const email = searchParams.get('email')
  const code = searchParams.get('code')

  const accessCodeMutation = useMutation({
    mutationFn: validateEmail,
    onSuccess: async () => {
      navigate(ROUTES.CREATE_NEW_PASSWORD.getPath(), {
        state: { email: email, code: code },
      })
    },
  })

  const onFinish = async (values: IValidateEmailRequest) => {
    await accessCodeMutation.mutateAsync(values)
  }

  return { email, code, isLoading: accessCodeMutation.isPending, onFinish }
}
