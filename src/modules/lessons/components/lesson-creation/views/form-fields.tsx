import { Space, Switch } from 'antd'
import useFormInstance from 'antd/es/form/hooks/useFormInstance'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IFile } from '~/lib/api/types'
import { Uploader } from '~/lib/components/uploader'
import { acceptedFormatOnlyImages, acceptedFormatOnlyPDF } from '~/lib/constants/file-formats'
import { FormItem } from '~/shared/ui/form-item'
import { InputText } from '~/shared/ui/input-text'
import { ETextSizes, Text } from '~/shared/ui/text'
import { TextArea } from '~/shared/ui/textarea'

interface IFormFieldsProps {
  className?: string
}

export const FormFields: FC<IFormFieldsProps> = () => {
  const { t } = useTranslation()
  const form = useFormInstance()
  const [image, setImage] = useState<File | null>(null)
  const [images, setImages] = useState<(File | IFile)[]>([])
  const [videoPlaceholder, setVideoPlaceholder] = useState<File | null>(null)

  useEffect(() => {
    form.setFieldValue('cover', image)
  }, [image, form])

  useEffect(() => {
    form.setFieldValue('files', images)
  }, [images, form])

  useEffect(() => {
    form.setFieldValue('coverPlaceholder', videoPlaceholder)
  }, [videoPlaceholder, form])

  return (
    <>
      <Uploader label={t('FORM.TITLE_IMAGE_OR_VIDEO.LABEL')} setImage={setImage} />
      <FormItem hidden name='cover' />

      <Uploader
        label={t('FORM.VIDEO_PLACEHOLDER.LABEL')}
        setImage={setVideoPlaceholder}
        formats={acceptedFormatOnlyImages}
        description='FORM.UPLOADER_ONLY_IMAGES.PLACEHOLDER'
      />
      <FormItem hidden name='coverPlaceholder' />

      <FormItem
        name='title'
        rules={[{ required: true }, { max: 128 }]}
        label={t('FORM.COURSE_NAME.LABEL')}
      >
        <InputText />
      </FormItem>
      <FormItem
        name='description'
        rules={[{ min: 3 }, { max: 5120 }]}
        label={t('FORM.DESCRIPTION.LABEL')}
      >
        <TextArea
          placeholder={t('FORM.DESCRIPTION.PLACEHOLDER')}
          autoSize
          showCount
          maxLength={5120}
        />
      </FormItem>

      <Uploader
        description='FORM.FILE_PDF.PLACEHOLDER'
        label={t('FORM.FILE_PDF.LABEL')}
        setImages={setImages}
        multiple
        formats={acceptedFormatOnlyPDF}
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
