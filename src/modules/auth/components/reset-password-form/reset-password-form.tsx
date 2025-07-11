import { Form } from 'antd'
import classNames from 'classnames'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '~/lib/constants/routes'
import { Button } from '~/shared/ui/button'
import { FormItem } from '~/shared/ui/form-item'
import { InputText } from '~/shared/ui/input-text'
import { Link } from '~/shared/ui/link'
import { ETextSizes, Text } from '~/shared/ui/text'
import { Title } from '~/shared/ui/title'
import { useResetPassword } from './hooks'
import cls from './reset-password-form.module.scss'

interface IResetPasswordFormProps {
  className?: string
}

export const ResetPasswordForm: FC<IResetPasswordFormProps> = ({ className }) => {
  const { t } = useTranslation()
  const { onFinish, cantResend, isLoading, resendTime } = useResetPassword()
  const [form] = Form.useForm()

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        className={classNames(cls.wrapper, [className])}
        layout='vertical'
        autoComplete='on'
        name='reset-pass-send-email'
        requiredMark={false}
      >
        <Title level={1} className={cls.title}>
          {t('PAGES.RESET_PASSWORD.TITLE')}
        </Title>
        <Text size={ETextSizes.PSR}>{t('PAGES.RESET_PASSWORD.DESCRIPTION')}</Text>
        <FormItem
          label={t('FORM.EMAIL.LABEL')}
          name='email'
          rules={[{ type: 'email' }, { required: true }]}
        >
          <InputText placeholder={t('FORM.EMAIL.PLACEHOLDER') as string} />
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
                disabled={!isFieldsTouched || isError || cantResend}
                loading={isLoading}
              >
                {t('ACTIONS.RESET_PASSWORD')}
                {cantResend && <span className={cls.timer}>{resendTime as unknown as string}</span>}
              </Button>
            )
          }}
        </FormItem>
      </Form>
      <Link to={ROUTES.SIGN_IN.getPath()}>
        <Button isInverted>{t('PAGES.RESET_PASSWORD.BACK')}</Button>
      </Link>
    </>
  )
}
