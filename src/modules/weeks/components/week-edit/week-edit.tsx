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
import { FormItem } from '~/shared/ui/form-item'
import { Spin } from '~/shared/ui/spin'
import { scrollToFirstError } from '~/shared/utils/form'
import { EDrawerKeys } from '../../types'
import { useEditWeek } from './hooks'
import { IEditWeekFormValues } from './types'
import { FormFields } from './views'

export const WeekEdit = () => {
  const [form] = Form.useForm<IEditWeekFormValues>()
  const { closeDrawer } = useDrawerContext()
  const { onFinish, isLoading, initialValues, onClose } = useEditWeek(closeDrawer, form)

  return (
    <DrawerElement drawerKey={EDrawerKeys.WEEK_EDIT}>
      <Form
        form={form}
        name='edit_week'
        requiredMark={false}
        layout='vertical'
        autoComplete='on'
        onFinish={onFinish}
        clearOnDestroy
        scrollToFirstError={{
          block: 'start',
          behavior: scrollToFirstError,
        }}
      >
        <DrawerCard>
          <DrawerHeader title={t('PAGES.WEEKS.EDIT_WEEK')} onClose={onClose} />
          <DrawerBody>
            <Spin spinning={isLoading} size='large'>
              <FormFields initialValues={initialValues} />
            </Spin>
          </DrawerBody>
          <DrawerFooter>
            <FormItem shouldUpdate style={{ marginBottom: 0 }}>
              {() => {
                return (
                  <Button type='primary' block htmlType='submit' disabled={isLoading}>
                    {t('PAGES.WEEKS.EDIT_WEEK')}
                  </Button>
                )
              }}
            </FormItem>
          </DrawerFooter>
        </DrawerCard>
      </Form>
    </DrawerElement>
  )
}
