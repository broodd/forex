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
import { useEditLesson } from './hooks'
import { IUpdateLessonFormValues } from './types'
import { FormFields } from './views'
import { EDrawerBonusKeys } from '../../types'
import { FormItem } from '~/shared/ui/form-item'

export const BonusEdit = () => {
  const [form] = Form.useForm<IUpdateLessonFormValues>()
  const { closeDrawer } = useDrawerContext()
  const { onFinish, isLoading, initialValues, onClose } = useEditLesson(closeDrawer, form)

  return (
    <DrawerElement drawerKey={EDrawerBonusKeys.BONUS_EDIT}>
      <Form
        clearOnDestroy
        form={form}
        name='edit_bonus'
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
          <DrawerHeader title={t('PAGES.BONUSES.EDIT_BONUS')} onClose={onClose} />
          <DrawerBody>
            <Spin spinning={isLoading} percent='auto' size='large'>
              <FormFields initialValues={initialValues} />
            </Spin>
          </DrawerBody>
          <DrawerFooter>
            <FormItem shouldUpdate style={{ marginBottom: 0 }}>
              {() => (
                <Button type='primary' block htmlType='submit' disabled={isLoading}>
                  {t('PAGES.BONUSES.EDIT_BONUS')}
                </Button>
              )}
            </FormItem>
          </DrawerFooter>
        </DrawerCard>
      </Form>
    </DrawerElement>
  )
}
