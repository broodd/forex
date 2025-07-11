import { Form, Space, Switch } from 'antd'
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
  initialValues: {
    cover: IFile | undefined
    coverPlaceholder?: IFile | undefined
    title: string | undefined
    isVisible: boolean | undefined
    description: string | undefined
    files: IFile[] | undefined
  }
}

export const FormFields: FC<IFormFieldsProps> = ({ initialValues }) => {
  const { t } = useTranslation()
  const form = useFormInstance()
  const [image, setImage] = useState<File | null>(null)
  const [images, setImages] = useState<(File | IFile)[]>(initialValues.files || [])
  const [videoPlaceholder, setVideoPlaceholder] = useState<File | null>(null)
  const isVisibleValue = Form.useWatch('isVisible', form)

  useEffect(() => {
    form.setFieldValue('coverPlaceholder', videoPlaceholder)
  }, [videoPlaceholder, form.setFieldValue, form])

  useEffect(() => {
    form.setFieldValue('cover', image)
  }, [image, form])

  useEffect(() => {
    form.setFieldValue('files', images)
  }, [images, form])

  return (
    <>
      <Uploader
        label={t('FORM.TITLE_IMAGE_OR_VIDEO.LABEL')}
        setImage={setImage}
        initialFiles={initialValues.cover ? [initialValues.cover] : []}
      />
      <FormItem hidden name='cover' />

      <Uploader
        label={t('FORM.VIDEO_PLACEHOLDER.LABEL')}
        setImage={setVideoPlaceholder}
        formats={acceptedFormatOnlyImages}
        description='FORM.UPLOADER_ONLY_IMAGES.PLACEHOLDER'
        initialFiles={initialValues.coverPlaceholder ? [initialValues.coverPlaceholder] : []}
      />
      <FormItem hidden name='coverPlaceholder' />

      <FormItem
        name='title'
        rules={[{ required: true }, { max: 128 }]}
        label={t('FORM.COURSE_NAME.LABEL')}
        initialValue={initialValues.title}
      >
        <InputText />
      </FormItem>
      <FormItem
        initialValue={initialValues.description}
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
        initialFiles={initialValues.files}
      />
      <FormItem hidden name='files' />

      <FormItem name='isVisible' hidden />
      <Space>
        <Switch
          onChange={(checked) => form.setFieldValue('isVisible', checked)}
          checked={isVisibleValue}
          defaultChecked={initialValues.isVisible}
        />
        <Text size={ETextSizes.PGS}>{t('FORM.VISIBLE_FOR_CUSTOMERS.LABEL')}</Text>
      </Space>
    </>
  )
}
