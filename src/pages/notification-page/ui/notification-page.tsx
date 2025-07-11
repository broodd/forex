import { useTranslation } from 'react-i18next'

import { PageLayout } from '~/layouts'
import { Button } from '~/shared/ui/button'
import { AddIcon } from '~/shared/ui/icon'
import {
  NotificationCreation,
  NotificationEdit,
  NotificationsTable,
  useNotificationData,
} from '~/modules/notifications'
import { Drawer, DrawerProvider } from '~/shared/ui/drawer'
import { EDrawerKeys } from '~/modules/notifications/types'
import { useDrawerContext } from '~/shared/ui/drawer/hooks'
import { Flex } from 'antd'
import { useNotificationsStore } from '~/modules/notifications/store'
import { ENotificationType } from '~/lib/api/types'

// import cls from './notification-page.module.scss'

const NotificationBasePage = () => {
  const { t } = useTranslation()
  const { openDrawer } = useDrawerContext()
  const { setNotificationType } = useNotificationsStore()
  const {
    columns,
    handleTableChange,
    isLoading,
    notifications,
    setTableParams,
    tableParams,
    total,
  } = useNotificationData()

  return (
    <>
      <PageLayout
        header={{
          title: t('PAGES.NOTIFICATIONS.TITLE')!,
          extra: (
            <Flex align='center' gap={24}>
              <Button
                type='primary'
                onClick={() => {
                  setNotificationType(ENotificationType.WATER_REMINDER)
                  openDrawer(EDrawerKeys.NOTIFICATION_EDIT)
                }}
              >
                {t('ACTIONS.EDIT_WATER')}
              </Button>
              <Button
                type='primary'
                onClick={() => {
                  setNotificationType(ENotificationType.STEPS_REMINDER)
                  openDrawer(EDrawerKeys.NOTIFICATION_EDIT)
                }}
              >
                {t('ACTIONS.EDIT_STEPS')}
              </Button>
              <Button
                icon={<AddIcon />}
                type='primary'
                onClick={() => openDrawer(EDrawerKeys.NOTIFICATION_CREATION)}
              >
                {t('ACTIONS.CREATE_NEW_NOTIFICATION')}
              </Button>
            </Flex>
          ),
        }}
      >
        <NotificationsTable
          columns={columns}
          handleTableChange={handleTableChange}
          isLoading={isLoading}
          notifications={notifications}
          setTableParams={setTableParams}
          tableParams={tableParams}
          total={total}
        />
      </PageLayout>
      <Drawer elements={[NotificationCreation, NotificationEdit]} />
    </>
  )
}

export const NotificationPage = () => (
  <DrawerProvider>
    <NotificationBasePage />
  </DrawerProvider>
)

export default NotificationPage
