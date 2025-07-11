import { Form } from 'antd'
import classNames from 'classnames'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '~/shared/ui/button'
import { FormItem } from '~/shared/ui/form-item'
import { InputText } from '~/shared/ui/input-text'
import { InputPassword } from '~/shared/ui/input-text/ui/input-password'
import { Title } from '~/shared/ui/title'
import { AUTH_PASSWORD_REGEXP } from '~/shared/utils/reg-exp'
import cls from './create-new-password-form.module.scss'
import { useCreateNewPassword } from './hooks'
import { ICreateNewPasswordFormValues } from './types'

interface ICreateNewPasswordFormProps {
  className?: string
}

export const CreateNewPasswordForm: FC<ICreateNewPasswordFormProps> = ({ className }) => {
  const { t } = useTranslation()
  const [form] = Form.useForm<ICreateNewPasswordFormValues>()
  const { onFinish, code, email, handleConfirmPasswordValidator } = useCreateNewPassword(form)

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        className={classNames(cls.wrapper, [className])}
        layout='vertical'
        autoComplete='on'
        name='create-new=password'
        requiredMark={false}
        initialValues={{ email: email || '', code: code || '' }}
      >
        <Title level={1} className={cls.title}>
          {t('PAGES.CREATE_NEW_PASSWORD.TITLE')}
        </Title>

        <FormItem name='email' hidden={true}>
          <InputText hidden={true} />
        </FormItem>
        <FormItem name='code' hidden={true}>
          <InputText hidden={true} />
        </FormItem>

        <FormItem
          label={t('FORM.NEW_PASSWORD.LABEL')}
          name='new_password'
          rules={[
            { required: true },
            {
              pattern: AUTH_PASSWORD_REGEXP,
              message: t('FORM.VALIDATE_MESSAGES.PASSWORD_PATTERN') as string,
            },
          ]}
        >
          <InputPassword
            autoComplete='new-password'
            placeholder={t('FORM.NEW_PASSWORD.PLACEHOLDER') as string}
          />
        </FormItem>

        <FormItem
          label={t('FORM.CONFIRM_PASSWORD.LABEL')}
          name='confirm_password'
          rules={[
            { required: true },
            {
              pattern: AUTH_PASSWORD_REGEXP,
              message: t('FORM.VALIDATE_MESSAGES.PASSWORD_PATTERN') as string,
            },
            { validator: handleConfirmPasswordValidator },
          ]}
        >
          <InputPassword
            autoComplete='new-password'
            placeholder={t('FORM.CONFIRM_PASSWORD.PLACEHOLDER') as string}
          />
        </FormItem>

        <FormItem shouldUpdate className={cls.action}>
          {() => {
            const isFieldsTouched = form.isFieldsTouched()
            const isError =
              form
                .getFieldsError()
                .map((err) => err.errors)
                .flat().length > 0

            return (
              <Button
                type='primary'
                htmlType='submit'
                className={cls.button}
                disabled={!isFieldsTouched || isError}
              >
                {t('ACTIONS.CONFIRM')}
              </Button>
            )
          }}
        </FormItem>
      </Form>
    </>
  )
}
