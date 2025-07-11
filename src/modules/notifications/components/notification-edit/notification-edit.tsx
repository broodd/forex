import {
  DrawerBody,
  DrawerCard,
  DrawerElement,
  DrawerFooter,
  DrawerHeader,
} from '~/shared/ui/drawer'
import { EDrawerKeys, INotificationEditFormValues } from '../../types'
import { Form } from 'antd'
import { scrollToFirstError } from '~/shared/utils/form'
import { Spin } from '~/shared/ui/spin'
import { Button } from '~/shared/ui/button'
import { useTranslation } from 'react-i18next'
import { useDrawerContext } from '~/shared/ui/drawer/hooks'
import { FormFields } from './views'
import { useNotificationEdit } from '../../hooks'
import { useNotificationsStore } from '../../store'
import { ENotificationType } from '~/lib/api/types'

export const NotificationEdit = () => {
  const { notificationType } = useNotificationsStore()
  const { t } = useTranslation()
  const [form] = Form.useForm<INotificationEditFormValues>()
  const { closeDrawer } = useDrawerContext()
  const { initialValues, isLoading, onFinish } = useNotificationEdit(closeDrawer, form)
  const isWater = notificationType === ENotificationType.WATER_REMINDER

  return (
    <DrawerElement drawerKey={EDrawerKeys.NOTIFICATION_EDIT}>
      <Form
        form={form}
        name='edit_notification'
        requiredMark={false}
        layout='vertical'
        autoComplete='on'
        onFinish={onFinish}
        scrollToFirstError={{
          block: 'start',
          behavior: scrollToFirstError,
        }}
        initialValues={initialValues}
      >
        <DrawerCard>
          <DrawerHeader
            title={
              isWater
                ? t('PAGES.NOTIFICATIONS.EDIT_NOTIFICATION.WATER')
                : t('PAGES.NOTIFICATIONS.EDIT_NOTIFICATION.STEPS')
            }
          />
          <DrawerBody>
            <Spin spinning={isLoading} percent='auto' size='large'>
              <FormFields />
            </Spin>
          </DrawerBody>
          <DrawerFooter>
            <Button type='primary' block htmlType='submit' disabled={isLoading}>
              {t('PAGES.NOTIFICATIONS.EDIT_NOTIFICATION.BTN')}
            </Button>
          </DrawerFooter>
        </DrawerCard>
      </Form>
    </DrawerElement>
  )
}
