import { Form } from 'antd'
import classNames from 'classnames'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '~/shared/ui/button'
import { FormItem } from '~/shared/ui/form-item'
import { InputText } from '~/shared/ui/input-text'
import { InputPassword } from '~/shared/ui/input-text/ui/input-password'
import { Title } from '~/shared/ui/title'
import { useSignIn } from './hooks'
import cls from './sign-in-form.module.scss'

interface ISignInFormProps {
  className?: string
}

export const SignInForm: FC<ISignInFormProps> = ({ className }) => {
  const { t } = useTranslation()
  const { onFinish } = useSignIn()
  const [form] = Form.useForm()

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        className={classNames(cls.wrapper, [className])}
        layout='vertical'
        autoComplete='on'
        name='sign-in'
        requiredMark={false}
      >
        <Title level={1} className={cls.title}>
          {t('PAGES.SIGN_IN.TITLE')}
        </Title>
        <FormItem
          label={t('FORM.EMAIL.LABEL')}
          name='email'
          initialValue={'admin@gmail.com'}
          rules={[{ type: 'email' }, { required: true }]}
        >
          <InputText placeholder={t('FORM.EMAIL.PLACEHOLDER') as string} />
        </FormItem>

        <FormItem label={t('FORM.PASSWORD.LABEL')} name='password' rules={[{ required: true }]}>
          <InputPassword
            defaultValue={'Password1'}
            placeholder={t('FORM.PASSWORD.PLACEHOLDER') as string}
          />
        </FormItem>

        <FormItem shouldUpdate className={cls.action}>
          {() => {
            // const isFieldsTouched = form.isFieldsTouched()
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
                disabled={isError}
                // disabled={!isFieldsTouched || isError}
              >
                {t('ACTIONS.SIGN_IN')}
              </Button>
            )
          }}
        </FormItem>
      </Form>
    </>
  )
}
