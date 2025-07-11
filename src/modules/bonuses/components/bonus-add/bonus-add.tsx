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
import { EDrawerBonusKeys } from '../../types'
import { useCreateLesson } from './hooks'
import { ICreateBonusFormValues } from './types'
import { FormFields } from './views'

export const BonusAdd = () => {
  const [form] = Form.useForm<ICreateBonusFormValues>()
  const { closeDrawer } = useDrawerContext()
  const { onFinish, isLoading } = useCreateLesson(closeDrawer, form)

  return (
    <DrawerElement drawerKey={EDrawerBonusKeys.BONUS_CREATION}>
      <Form
        form={form}
        name='create_bonus'
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
          <DrawerHeader title={t('PAGES.BONUSES.CREATE_BONUS')} />
          <DrawerBody>
            <Spin spinning={isLoading} percent='auto' size='large'>
              <FormFields />
            </Spin>
          </DrawerBody>
          <DrawerFooter>
            <FormItem shouldUpdate style={{ marginBottom: 0 }}>
              {() => (
                <Button type='primary' block htmlType='submit' disabled={isLoading}>
                  {t('PAGES.BONUSES.CREATE_BONUS')}
                </Button>
              )}
            </FormItem>
          </DrawerFooter>
        </DrawerCard>
      </Form>
    </DrawerElement>
  )
}
