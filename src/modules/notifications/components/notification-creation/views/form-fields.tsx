import useFormInstance from 'antd/es/form/hooks/useFormInstance'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Uploader } from '~/lib/components/uploader'
import { acceptedFormatOnlyImages } from '~/lib/constants/file-formats'
import { Dayjs, dayjs } from '~/shared/providers'
import { DatePicker } from '~/shared/ui/date-picker'
import { FormItem } from '~/shared/ui/form-item'
import { InputText } from '~/shared/ui/input-text'
import { IntervalPicker } from '~/shared/ui/interval-picker'
import { TextArea } from '~/shared/ui/textarea'

interface IFormFieldsProps {
  className?: string
}

export const FormFields: FC<IFormFieldsProps> = () => {
  const { t } = useTranslation()
  const { setFieldValue } = useFormInstance()
  const [image, setImage] = useState<File | null>(null)

  const disabledDate = (current: Dayjs) => {
    return current && current < dayjs().startOf('day')
  }

  useEffect(() => {
    setFieldValue('image', image)
  }, [image, setFieldValue])

  return (
    <>
      <FormItem name='date' label={t('FORM.SELECT_DATE.LABEL')}>
        <IntervalPicker disabledDate={disabledDate} />
      </FormItem>

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

      <Uploader
        label={t('FORM.IMAGE.LABEL')}
        setImage={setImage}
        formats={acceptedFormatOnlyImages}
        description='FORM.UPLOADER_ONLY_IMAGES.PLACEHOLDER'
      />
      <FormItem hidden name='image' />
    </>
  )
}
