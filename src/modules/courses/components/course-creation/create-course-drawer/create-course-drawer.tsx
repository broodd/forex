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

import { EDrawerKeys } from '~/modules/courses/types'
import { Spin } from '~/shared/ui/spin'
import { scrollToFirstError } from '~/shared/utils/form'
import { useCreateCourse } from './hooks'
import { ICreateCourseFormValues } from './types'
import { FormFields } from './views'

export const CreateCourseDrawer = () => {
  const [form] = Form.useForm<ICreateCourseFormValues>()
  const { closeDrawer } = useDrawerContext()
  const { onFinish, isLoading } = useCreateCourse(closeDrawer, form)

  return (
    <DrawerElement drawerKey={EDrawerKeys.COURSE_CREATION}>
      <Form
        form={form}
        name='create_course'
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
          <DrawerHeader title={t('PAGES.COURSES.CREATE_COURSE')} />
          <DrawerBody>
            <Spin spinning={isLoading} percent='auto' size='large'>
              <FormFields />
            </Spin>
          </DrawerBody>
          <DrawerFooter>
            <Button type='primary' block htmlType='submit' disabled={isLoading}>
              {t('PAGES.COURSES.CREATE_COURSE')}
            </Button>
          </DrawerFooter>
        </DrawerCard>
      </Form>
    </DrawerElement>
  )
}
