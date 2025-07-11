import { Space, Switch } from 'antd'
import useFormInstance from 'antd/es/form/hooks/useFormInstance'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Uploader } from '~/lib/components/uploader'
import { acceptedFormatOnlyImages } from '~/lib/constants/file-formats'
import { courseTypeOptions } from '~/lib/constants/options'
import { FormItem } from '~/shared/ui/form-item'
import { InputText } from '~/shared/ui/input-text'
import { Select } from '~/shared/ui/select'
import { ETextSizes, Text } from '~/shared/ui/text'
import { TextArea } from '~/shared/ui/textarea'
import { validateInputWithFractionalNumbers } from '~/shared/utils/form'

interface IFormFieldsProps {
  className?: string
}

export const FormFields: FC<IFormFieldsProps> = () => {
  const { t } = useTranslation()
  const { setFieldValue } = useFormInstance()
  const [image, setImage] = useState<File | null>(null)
  const [videoPlaceholder, setVideoPlaceholder] = useState<File | null>(null)
  const [bannerCover, setBannerCover] = useState<File | null>(null)

  useEffect(() => {
    setFieldValue('cover', image)
  }, [image, setFieldValue])

  useEffect(() => {
    setFieldValue('coverPlaceholder', videoPlaceholder)
  }, [videoPlaceholder, setFieldValue])

  useEffect(() => {
    setFieldValue('bannerCover', bannerCover)
  }, [bannerCover, setFieldValue])

  return (
    <>
      <FormItem name='type' rules={[{ required: true }]} label={t('FORM.TYPE.LABEL')}>
        <Select options={courseTypeOptions} />
      </FormItem>
      <FormItem
        name='title'
        rules={[{ required: true }, { max: 128 }]}
        label={t('FORM.COURSE_NAME.LABEL')}
      >
        <InputText placeholder={t('FORM.COURSE_NAME.PLACEHOLDER')} />
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
      <Uploader label={t('FORM.IMAGE_OR_VIDEO.LABEL')} setImage={setImage} />
      <FormItem hidden name='cover' required />
      <Uploader
        label={t('FORM.VIDEO_PLACEHOLDER.LABEL')}
        setImage={setVideoPlaceholder}
        formats={acceptedFormatOnlyImages}
        description='FORM.UPLOADER_ONLY_IMAGES.PLACEHOLDER'
      />
      <FormItem hidden name='coverPlaceholder' />

      <Uploader
        label={t('FORM.BANNER_COVER.LABEL')}
        setImage={setBannerCover}
        formats={acceptedFormatOnlyImages}
        description='FORM.UPLOADER_ONLY_IMAGES.PLACEHOLDER'
      />
      <FormItem hidden name='bannerCover' />

      <FormItem name='price' rules={[{ required: true }]} label={t('FORM.PRICE.LABEL')}>
        <InputText onKeyDown={validateInputWithFractionalNumbers} prefix='€' />
      </FormItem>
      <FormItem name='isVisible' hidden />
      <Space>
        <Switch onChange={(checked) => setFieldValue('isVisible', checked)} />
        <Text size={ETextSizes.PGS}>{t('FORM.VISIBLE_FOR_CUSTOMERS.LABEL')}</Text>
      </Space>
    </>
  )
}
