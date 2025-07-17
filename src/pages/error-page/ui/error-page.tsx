import { useTranslation } from 'react-i18next'

import { Text } from '~/shared/ui/text'
import { Title } from '~/shared/ui/title'
import cls from './error-page.module.scss'

const ErrorPage = () => {
  const { t } = useTranslation()

  return (
    <div className={cls.wrapper}>
      <div className={cls.backgroundImage}>
        <div className={cls.textContainer}>
          <Title className={cls.title}>{t('PAGES.ERROR.TITLE')}</Title>
          <Text className={cls.description}>{t('PAGES.ERROR.DESCRIPTION')}</Text>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
