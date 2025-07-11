import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { DatePicker } from '~/shared/ui/date-picker'
import { FormItem } from '~/shared/ui/form-item'
import { InputText } from '~/shared/ui/input-text'
import { TextArea } from '~/shared/ui/textarea'

interface IFormFieldsProps {
  className?: string
}

export const FormFields: FC<IFormFieldsProps> = () => {
  const { t } = useTranslation()

  return (
    <>
      <FormItem name='reminderTime' label={t('FORM.TIME.LABEL')}>
        <DatePicker picker='time' needConfirm={false} format='HH' />
      </FormItem>

      <FormItem
        name='title'
        rules={[{ required: true }, { max: 256 }]}
        label={t('FORM.TITLE.LABEL')}
      >
        <InputText placeholder={t('FORM.TITLE.PLACEHOLDER')} />
      </FormItem>

      <FormItem name='body' rules={[{ min: 1 }, { max: 256 }]} label={t('FORM.TEXT.LABEL')}>
        <TextArea placeholder={t('FORM.TEXT.PLACEHOLDER')} autoSize showCount maxLength={256} />
      </FormItem>
    </>
  )
}
