import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { signIn } from '~/lib/api/services'
import { ISignInRequest, ISignInResponse } from '~/lib/api/types'
import { ROUTES } from '~/lib/constants/routes'
import { useAuth } from '~/shared/hooks/useAuth'

export const useSignIn = () => {
  const navigate = useNavigate()
  const { logIn } = useAuth()

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: async (response: ISignInResponse) => {
      if (response.result) {
        await logIn({ result: response.result })

        navigate(ROUTES.DASHBOARD.getPath())
      }
    },
  })

  const onFinish = async ({ email, password }: ISignInRequest) =>
    signInMutation.mutate({ email, password })

  return { onFinish }
}
