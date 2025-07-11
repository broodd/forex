import { FC } from 'react'
import classNames from 'classnames'
import cls from './access-code-form.module.scss'
import { Form } from 'antd'
import { FormItem } from '~/shared/ui/form-item'
import { useTranslation } from 'react-i18next'
import { InputOTP, InputText } from '~/shared/ui/input-text'
import { Button } from '~/shared/ui/button'
import { useAccessCode } from './hooks'
import { Title } from '~/shared/ui/title'

interface IAccessCodeFormProps {
  className?: string
}

export const AccessCodeForm: FC<IAccessCodeFormProps> = ({ className }) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const { code, email, isLoading, onFinish } = useAccessCode()
  return (
    <Form
      className={classNames(cls.wrapper, [className])}
      name='access-code'
      layout='vertical'
      autoComplete='off'
      onFinish={onFinish}
      initialValues={{ email: email || '', code: code || '' }}
      requiredMark={false}
    >
      <Title level={1} className={cls.title}>
        {t('PAGES.ACCESS_CODE.TITLE')}
      </Title>
      <FormItem name='code' rules={[{ required: true }]}>
        <InputOTP />
      </FormItem>
      <FormItem name='email' hidden={true}>
        <InputText hidden={true} />
      </FormItem>
      <FormItem shouldUpdate className={cls.action}>
        {() => {
          const isError =
            form
              .getFieldsError()
              .map((err) => err.errors)
              .flat().length > 0

          return (
            <Button
              type='primary'
              size='large'
              htmlType='submit'
              loading={isLoading}
              className={cls.button}
              disabled={isError}
            >
              {t('ACTIONS.CONFIRM')}
            </Button>
          )
        }}
      </FormItem>
    </Form>
  )
}
