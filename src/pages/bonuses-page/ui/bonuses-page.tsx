import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { PageLayout } from '~/layouts'
import { BonusAdd, BonusEdit, BonusesTable, BonusView } from '~/modules/bonuses/components'
import { Button } from '~/shared/ui/button'
import { Drawer, DrawerProvider } from '~/shared/ui/drawer'
import { AddIcon } from '~/shared/ui/icon'
import cls from './bonuses-page.module.scss'
import { EDrawerBonusKeys } from '~/modules/bonuses'
import { useDrawerContext } from '~/shared/ui/drawer/hooks'

const BonusesBasePage = () => {
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
              onClick={() => openDrawer(EDrawerBonusKeys.BONUS_CREATION)}
            >
              {t('PAGES.BONUSES.BTN_ADD')}
            </Button>
          ),
        }}
      >
        <BonusesTable />
      </PageLayout>
      <Drawer elements={[BonusView, BonusAdd, BonusEdit]} />
    </>
  )
}

export const BonusesPage = () => (
  <DrawerProvider>
    <BonusesBasePage />
  </DrawerProvider>
)

export default BonusesPage
