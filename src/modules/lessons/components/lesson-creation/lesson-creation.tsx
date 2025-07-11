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
import { useCreateLesson } from './hooks'
import { ICreateLessonFormValues } from './types'
import { FormFields } from './views'
import { EDrawerLessonKeys } from '../../types'

export const LessonCreation = () => {
  const [form] = Form.useForm<ICreateLessonFormValues>()
  const { closeDrawer } = useDrawerContext()
  const { onFinish, isLoading } = useCreateLesson(closeDrawer, form)

  return (
    <DrawerElement drawerKey={EDrawerLessonKeys.LESSON_CREATION}>
      <Form
        form={form}
        name='create_lesson'
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
          <DrawerHeader title={t('PAGES.LESSONS.CREATE_LESSON')} />
          <DrawerBody>
            <Spin spinning={isLoading} percent='auto' size='large'>
              <FormFields />
            </Spin>
          </DrawerBody>
          <DrawerFooter>
            <Button type='primary' block htmlType='submit' disabled={isLoading}>
              {t('PAGES.LESSONS.CREATE_LESSON')}
            </Button>
          </DrawerFooter>
        </DrawerCard>
      </Form>
    </DrawerElement>
  )
}
