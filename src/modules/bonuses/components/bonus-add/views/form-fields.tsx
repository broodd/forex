import { Space, Switch } from 'antd'
import useFormInstance from 'antd/es/form/hooks/useFormInstance'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IFile } from '~/lib/api/types'
import { Uploader } from '~/lib/components/uploader'
import { acceptedFormatOnlyImages, acceptedFormats } from '~/lib/constants/file-formats'
import { FormItem } from '~/shared/ui/form-item'
import { InputText } from '~/shared/ui/input-text'
import { ETextSizes, Text } from '~/shared/ui/text'

interface IFormFieldsProps {
  className?: string
}

export const FormFields: FC<IFormFieldsProps> = () => {
  const { t } = useTranslation()
  const form = useFormInstance()
  const [image, setImage] = useState<File | null>(null)
  const [images, setImages] = useState<(File | IFile)[]>([])

  useEffect(() => {
    form.setFieldValue('cover', image)
  }, [image, form])

  useEffect(() => {
    form.setFieldValue('files', images)
  }, [images, form])

  return (
    <>
      <Uploader
        label={t('FORM.TITLE_IMAGE.LABEL')}
        setImage={setImage}
        formats={acceptedFormatOnlyImages}
        description='FORM.UPLOADER_ONLY_IMAGES.PLACEHOLDER'
      />
      <FormItem hidden name='cover' />

      <FormItem
        name='title'
        rules={[{ required: true }, { max: 128 }]}
        label={t('FORM.COURSE_NAME.LABEL')}
      >
        <InputText />
      </FormItem>

      <Uploader
        label={t('FORM.IMAGE_OR_VIDEO.LABEL')}
        setImages={setImages}
        multiple
        formats={acceptedFormats}
      />
      <FormItem hidden name='files' />

      <FormItem name='isVisible' hidden />
      <Space>
        <Switch onChange={(checked) => form.setFieldValue('isVisible', checked)} />
        <Text size={ETextSizes.PGS}>{t('FORM.VISIBLE_FOR_CUSTOMERS.LABEL')}</Text>
      </Space>
    </>
  )
}
