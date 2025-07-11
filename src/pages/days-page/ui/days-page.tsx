import { useTranslation } from 'react-i18next'

import { useParams } from 'react-router-dom'
import { PageLayout } from '~/layouts'
import { Button } from '~/shared/ui/button'
import { Drawer, DrawerProvider } from '~/shared/ui/drawer'
import { AddIcon } from '~/shared/ui/icon'
import cls from './days-page.module.scss'
import { DayCreation, DayEdit, DaysTable, DayView, EDrawerDaysKeys } from '~/modules/days'
import { useDrawerContext } from '~/shared/ui/drawer/hooks'

const DaysBasePage = () => {
  const { t } = useTranslation()
  const { name } = useParams()
  const { openDrawer } = useDrawerContext()

  return (
    <>
      <PageLayout
        className={cls.wrapper}
        header={{
          title: name,
          backBtn: true,
          extra: (
            <Button
              icon={<AddIcon />}
              type='primary'
              onClick={() => openDrawer(EDrawerDaysKeys.DAY_CREATION)}
            >
              {t('PAGES.DAYS.BTN_ADD')}
            </Button>
          ),
        }}
      >
        <DaysTable />
      </PageLayout>
      <Drawer elements={[DayCreation, DayView, DayEdit]} />
    </>
  )
}

export const DaysPage = () => (
  <DrawerProvider>
    <DaysBasePage />
  </DrawerProvider>
)

export default DaysPage
