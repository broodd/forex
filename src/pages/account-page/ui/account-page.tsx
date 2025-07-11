import { useTranslation } from 'react-i18next'

import { PageLayout } from '~/layouts'
import cls from './account-page.module.scss'
import { Button } from '~/shared/ui/button'
import { useAuth } from '~/shared/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import storage, { REFRESH_TOKEN_KEY } from '~/shared/utils/storage'
import { useMutation } from '@tanstack/react-query'
import { logout } from '~/lib/api/services'
import { ERoutes, ROUTES } from '~/lib/constants/routes'

const AccountPage = () => {
  const { t } = useTranslation()
  const { logOut } = useAuth()
  const navigate = useNavigate()
  const refreshToken = storage.getFromStorage(REFRESH_TOKEN_KEY)
  const logOutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      logOut()
      navigate(ROUTES[ERoutes.SIGN_IN].getPath())
    },
  })

  const handleLogout = () => {
    if (refreshToken) logOutMutation.mutate(refreshToken)
  }
  return (
    <PageLayout
      header={{
        title: t('PAGES.ACCOUNT.TITLE')!,
      }}
    >
      <div className={cls.wrapper}>
        <Button onClick={handleLogout}>{t('ACTIONS.LOG_OUT')}</Button>
      </div>
    </PageLayout>
  )
}

export default AccountPage
