import { Form, Space, Switch } from 'antd'
import useFormInstance from 'antd/es/form/hooks/useFormInstance'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IFile } from '~/lib/api/types'
import { Uploader } from '~/lib/components/uploader'
import { acceptedFormatOnlyImages } from '~/lib/constants/file-formats'
import { FormItem } from '~/shared/ui/form-item'
import { InputText } from '~/shared/ui/input-text'
import { ETextSizes, Text } from '~/shared/ui/text'

interface IFormFieldsProps {
  className?: string
  initialValues: {
    cover: IFile | undefined
    title: string | undefined
    isVisible: boolean | undefined
    coverPlaceholder: IFile | undefined | null
  }
}

export const FormFields: FC<IFormFieldsProps> = ({ initialValues }) => {
  const { t } = useTranslation()
  const form = useFormInstance()
  const [image, setImage] = useState<File | null>(null)
  const isVisibleValue = Form.useWatch('isVisible', form)
  const [videoPlaceholder, setVideoPlaceholder] = useState<File | null>(null)

  useEffect(() => {
    form.setFieldValue('coverPlaceholder', videoPlaceholder)
  }, [videoPlaceholder, form.setFieldValue, form])

  useEffect(() => {
    form.setFieldValue('cover', image)
  }, [image, form])

  return (
    <>
      <Uploader
        label={t('FORM.IMAGE_OR_VIDEO.LABEL')}
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
