import { Form, Space, Switch } from 'antd'
import useFormInstance from 'antd/es/form/hooks/useFormInstance'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ECourseType, IFile } from '~/lib/api/types'
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
  initialValues: {
    coverPlaceholder: IFile | undefined | null
    cover: IFile | undefined
    price: number | undefined
    salePrice: number | undefined
    title: string | undefined
    type: ECourseType | undefined
    isVisible: boolean | undefined
    description: string | undefined
    bannerCover: IFile | undefined | null
  }
}

export const FormFields: FC<IFormFieldsProps> = ({ initialValues }) => {
  const { t } = useTranslation()
  const form = useFormInstance()
  const [image, setImage] = useState<File | null>(null)
  const isVisibleValue = Form.useWatch('isVisible', form)
  const [videoPlaceholder, setVideoPlaceholder] = useState<File | null>(null)
  const [bannerCover, setBannerCover] = useState<File | null>(null)

  useEffect(() => {
    form.setFieldValue('coverPlaceholder', videoPlaceholder)
  }, [videoPlaceholder, form.setFieldValue, form])

  useEffect(() => {
    form.setFieldValue('cover', image)
  }, [image, form.setFieldValue, form])

  useEffect(() => {
    form.setFieldValue('bannerCover', bannerCover)
  }, [bannerCover, form, form.setFieldValue])

  return (
    <>
      <FormItem
        name='type'
        rules={[{ required: true }]}
        label={t('FORM.TYPE.LABEL')}
        initialValue={initialValues.type}
      >
        <Select options={courseTypeOptions} />
      </FormItem>
      <FormItem
        name='title'
        rules={[{ required: true }, { max: 128 }]}
        label={t('FORM.COURSE_NAME.LABEL')}
        initialValue={initialValues.title}
      >
        <InputText placeholder={t('FORM.COURSE_NAME.PLACEHOLDER')} />
      </FormItem>

      <FormItem
        name='description'
        rules={[{ min: 3 }, { max: 5120 }]}
        label={t('FORM.DESCRIPTION.LABEL')}
        initialValue={initialValues.description}
      >
        <TextArea
          placeholder={t('FORM.DESCRIPTION.PLACEHOLDER')}
          autoSize
          showCount
          maxLength={5120}
        />
      </FormItem>
      <Uploader
        label={t('FORM.IMAGE_OR_VIDEO.LABEL')}
        setImage={setImage}
        initialFiles={initialValues.cover ? [initialValues.cover] : []}
      />
      <FormItem hidden name='cover' required />

      <Uploader
        label={t('FORM.VIDEO_PLACEHOLDER.LABEL')}
        setImage={setVideoPlaceholder}
        formats={acceptedFormatOnlyImages}
        description='FORM.UPLOADER_ONLY_IMAGES.PLACEHOLDER'
        initialFiles={initialValues.coverPlaceholder ? [initialValues.coverPlaceholder] : []}
      />
      <FormItem hidden name='coverPlaceholder' />

      <Uploader
        label={t('FORM.BANNER_COVER.LABEL')}
        setImage={setBannerCover}
        formats={acceptedFormatOnlyImages}
        description='FORM.UPLOADER_ONLY_IMAGES.PLACEHOLDER'
        initialFiles={initialValues.bannerCover ? [initialValues.bannerCover] : []}
      />
      <FormItem hidden name='bannerCover' />

      <FormItem
        name='price'
        rules={[{ required: true }]}
        label={t('FORM.PRICE.LABEL')}
        initialValue={initialValues.price}
      >
        <InputText onKeyDown={validateInputWithFractionalNumbers} prefix='€' />
      </FormItem>
      <FormItem name='isVisible' hidden initialValue={initialValues.isVisible} />
      <Space>
        <Switch
          onChange={(checked) => form.setFieldValue('isVisible', checked)}
          defaultChecked={initialValues.isVisible}
          checked={isVisibleValue}
        />
        <Text size={ETextSizes.PGS}>{t('FORM.VISIBLE_FOR_CUSTOMERS.LABEL')}</Text>
      </Space>
    </>
  )
}
