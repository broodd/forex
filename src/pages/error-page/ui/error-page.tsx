import { useTranslation } from 'react-i18next'

import cls from './error-page.module.scss'
import { Title } from '~/shared/ui/title'
import { Text } from '~/shared/ui/text'
import { Button } from '~/shared/ui/button'
import { Link } from '~/shared/ui/link'
import { ROUTES } from '~/lib/constants/routes'
import { useAuth } from '~/shared/hooks/useAuth'
import { EProfileRole } from '~/lib/api/types'

const ErrorPage = () => {
  const { t } = useTranslation()
  const { client } = useAuth()
  const isAdmin = client.data?.role === EProfileRole.ADMIN

  return (
    <div className={cls.wrapper}>
      <div className={cls.backgroundImage}>
        <div className={cls.textContainer}>
          <Title className={cls.title}>{t('PAGES.ERROR.TITLE')}</Title>
          <Text className={cls.description}>{t('PAGES.ERROR.DESCRIPTION')}</Text>
          {isAdmin && (
            <Link to={ROUTES.COURSES.getPath()}>
              <Button type='primary' className={cls.btn}>
                {t('PAGES.ERROR.BTN')}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
