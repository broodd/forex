import { Form } from 'antd'
import { t } from 'i18next'
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
import { EDrawerKeys } from '../../types'
import { useCreateWeek } from './hooks'
import { ICreateWeekFormValues } from './types'
import { FormFields } from './views'

export const WeekCreation = () => {
  const [form] = Form.useForm<ICreateWeekFormValues>()
  const { closeDrawer } = useDrawerContext()
  const { onFinish, isLoading } = useCreateWeek(closeDrawer, form)

  return (
    <DrawerElement drawerKey={EDrawerKeys.WEEK_CREATION}>
      <Form
        form={form}
        name='create_week'
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
          <DrawerHeader title={t('PAGES.WEEKS.CREATE_WEEK')} />
          <DrawerBody>
            <Spin spinning={isLoading} percent='auto' size='large'>
              <FormFields />
            </Spin>
          </DrawerBody>
          <DrawerFooter>
            <Button type='primary' block htmlType='submit' disabled={isLoading}>
              {t('PAGES.WEEKS.CREATE_WEEK')}
            </Button>
          </DrawerFooter>
        </DrawerCard>
      </Form>
    </DrawerElement>
  )
}
