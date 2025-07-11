import { useParams } from 'react-router-dom'
import { PageLayout } from '~/layouts'
import { Drawer, DrawerProvider } from '~/shared/ui/drawer'
import { Button } from '~/shared/ui/button'
import { AddIcon } from '~/shared/ui/icon'
import { useDrawerContext } from '~/shared/ui/drawer/hooks'
import { EDrawerKeys, WeekCreation, WeekEdit, WeeksTable, WeekView } from '~/modules/weeks'
import { useTranslation } from 'react-i18next'

const WeeksBasePage = () => {
  const { name } = useParams()
  const { openDrawer } = useDrawerContext()
  const { t } = useTranslation()

  return (
    <>
      <PageLayout
        header={{
          title: name,
          backBtn: true,
          extra: (
            <Button
              icon={<AddIcon />}
              type='primary'
              onClick={() => openDrawer(EDrawerKeys.WEEK_CREATION)}
            >
              {t('PAGES.WEEKS.BTN_ADD')}
            </Button>
          ),
        }}
      >
        <WeeksTable />
      </PageLayout>
      <Drawer elements={[WeekView, WeekCreation, WeekEdit]} />
    </>
  )
}

export const WeeksPage = () => (
  <DrawerProvider>
    <WeeksBasePage />
  </DrawerProvider>
)

export default WeeksPage
