import { Form, Space, Switch } from 'antd'
import useFormInstance from 'antd/es/form/hooks/useFormInstance'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Uploader } from '~/lib/components/uploader'
import { weekTypeOptions } from '~/lib/constants/options'
import { FormItem } from '~/shared/ui/form-item'
import { InputText } from '~/shared/ui/input-text'
import { Select } from '~/shared/ui/select'
import { ETextSizes, Text } from '~/shared/ui/text'
import { QuestionsFormList } from './questions-form-list'
import { EWeekType, IFile } from '~/lib/api/types'
import { acceptedFormatOnlyImages } from '~/lib/constants/file-formats'

interface IFormFieldsProps {
  className?: string
  initialValues: {
    cover: IFile | undefined
    title: string | undefined
    type: EWeekType | undefined
    isVisible: boolean | undefined
    titleCover: IFile | undefined
    questions:
      | {
          id: string
          question: string
          description: string | undefined
          answerCorrect: string
          answerFalse1: string
          answerFalse2: string
        }[]
      | undefined
  }
}

export const FormFields: FC<IFormFieldsProps> = ({ initialValues }) => {
  const { t } = useTranslation()
  const form = useFormInstance()
  const [titleImage, setTitleImage] = useState<File | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const isVisibleValue = Form.useWatch('isVisible', form)

  const typeValue = Form.useWatch(['type'], form)

  useEffect(() => {
    form.setFieldValue('titleCover', titleImage)
  }, [titleImage, form])

  useEffect(() => {
    form.setFieldValue('cover', image)
  }, [image, form])

  return (
    <>
      <FormItem
        name='type'
        rules={[{ required: true }]}
        label={t('FORM.TYPE.LABEL')}
        initialValue={initialValues.type}
      >
        <Select options={weekTypeOptions} />
      </FormItem>
      <FormItem
        name='title'
        rules={[{ required: true }, { max: 128 }]}
        label={t('FORM.COURSE_NAME.LABEL')}
        initialValue={initialValues.title}
      >
        <InputText />
      </FormItem>

      <Uploader
        label={t('FORM.TITLE_IMAGE.LABEL')}
        setImage={setTitleImage}
        initialFiles={initialValues.titleCover ? [initialValues.titleCover] : []}
        formats={acceptedFormatOnlyImages}
        description='FORM.UPLOADER_ONLY_IMAGES.PLACEHOLDER'
      />
      <FormItem hidden name='titleCover' />

      <Uploader
        label={t('FORM.IMAGE_OR_VIDEO.LABEL')}
        setImage={setImage}
        initialFiles={initialValues.cover ? [initialValues.cover] : []}
      />
      <FormItem hidden name='cover' />

      <FormItem name='isVisible' hidden />
      <Space>
        <Switch
          onChange={(checked) => form.setFieldValue('isVisible', checked)}
          checked={isVisibleValue}
          defaultChecked={initialValues.isVisible}
        />
        <Text size={ETextSizes.PGS}>{t('FORM.VISIBLE_FOR_CUSTOMERS.LABEL')}</Text>
      </Space>
      {typeValue !== EWeekType.BONUS && <QuestionsFormList initialValues={initialValues} />}
    </>
  )
}
