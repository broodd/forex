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
import { useEditCourse } from './hooks'
import { IEditCourseFormValues } from './types'
import { FormFields } from './views'

export const EditCourseDrawer = () => {
  const [form] = Form.useForm<IEditCourseFormValues>()
  const { closeDrawer } = useDrawerContext()
  const { onFinish, isLoading, initialValues, onClose } = useEditCourse(closeDrawer, form)

  return (
    <DrawerElement drawerKey={EDrawerKeys.COURSE_EDIT}>
      <Form
        form={form}
        name='edit_course'
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
          <DrawerHeader title={t('PAGES.COURSES.EDIT_COURSE')} onClose={onClose} />
          <DrawerBody>
            <Spin spinning={isLoading} percent='auto' size='large'>
              <FormFields initialValues={initialValues} />
            </Spin>
          </DrawerBody>
          <DrawerFooter>
            <FormItem shouldUpdate style={{ marginBottom: 0 }}>
              {() => {
                return (
                  <Button type='primary' block htmlType='submit' disabled={isLoading}>
                    {t('PAGES.COURSES.EDIT_COURSE')}
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
