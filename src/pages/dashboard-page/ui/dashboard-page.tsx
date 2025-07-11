import { useTranslation } from 'react-i18next'

import { PageLayout } from '~/layouts'
import cls from './dashboard-page.module.scss'

const DashboardPage = () => {
  const { t } = useTranslation()

  return (
    <PageLayout
      header={{
        title: t('PAGES.DASHBOARD.TITLE')!,
      }}
    >
      <div className={cls.wrapper}>Dasha</div>
    </PageLayout>
  )
}

export default DashboardPage
