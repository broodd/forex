import { Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { Button } from '~/shared/ui/button'
import {
  DrawerBody,
  DrawerCard,
  DrawerElement,
  DrawerFooter,
  DrawerHeader,
} from '~/shared/ui/drawer'
import { useDrawerContext } from '~/shared/ui/drawer/hooks'
import { Spin } from '~/shared/ui/spin'
import { scrollToFirstError } from '~/shared/utils/form'
import { useCreateNotification } from '../../hooks'
import { EDrawerKeys, INotificationCreationFormValues } from '../../types'
import { FormFields } from './views'

export const NotificationCreation = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm<INotificationCreationFormValues>()
  const { closeDrawer } = useDrawerContext()
  const { onFinish, isLoading } = useCreateNotification(closeDrawer, form)

  return (
    <DrawerElement drawerKey={EDrawerKeys.NOTIFICATION_CREATION}>
      <Form
        form={form}
        name='create_notification'
        requiredMark={false}
        layout='vertical'
        autoComplete='on'
        onFinish={onFinish}
        scrollToFirstError={{
          block: 'start',
          behavior: scrollToFirstError,
        }}
      >
        <DrawerCard>
          <DrawerHeader title={t('PAGES.NOTIFICATIONS.CREATE_NOTIFICATION')} />
          <DrawerBody>
            <Spin spinning={isLoading} percent='auto' size='large'>
              <FormFields />
            </Spin>
          </DrawerBody>
          <DrawerFooter>
            <Button type='primary' block htmlType='submit' disabled={isLoading}>
              {t('PAGES.NOTIFICATIONS.CREATE_NOTIFICATION')}
            </Button>
          </DrawerFooter>
        </DrawerCard>
      </Form>
    </DrawerElement>
  )
}
