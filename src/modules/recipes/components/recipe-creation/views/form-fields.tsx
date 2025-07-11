import { Space, Switch } from 'antd'
import useFormInstance from 'antd/es/form/hooks/useFormInstance'
import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { recipeCategoryOptions, recipePropertyOptions } from '~/lib/constants/options'
import { FormItem } from '~/shared/ui/form-item'
import { InputText } from '~/shared/ui/input-text'
import { Select } from '~/shared/ui/select'
import { ETextSizes, Text } from '~/shared/ui/text'
import cls from './form-fields.module.scss'
import { TextArea } from '~/shared/ui/textarea'
import { Uploader } from '~/lib/components'
import { IngredientsCalculator } from '~/lib/components/ingredients-calculator'
import { ISelectedIngredient } from '~/lib/components/ingredients-calculator/types'
import { SectionList } from './section-list'
import { validateInputNumber } from '~/shared/utils/form'
import { acceptedFormatOnlyImages } from '~/lib/constants/file-formats'

interface IFormFieldsProps {
  className?: string
}

export const FormFields: FC<IFormFieldsProps> = ({ className }) => {
  const { t } = useTranslation()
  const { setFieldValue } = useFormInstance()
  const [image, setImage] = useState<File | null>(null)
  const [videoPlaceholder, setVideoPlaceHolder] = useState<File | null>(null)
  const [selectedIngr, setSelectedIngr] = useState<ISelectedIngredient[]>([])

  useEffect(() => {
    setFieldValue('cover', image)
  }, [image, setFieldValue])

  useEffect(() => {
    setFieldValue('coverPlaceholder', videoPlaceholder)
  }, [videoPlaceholder, setFieldValue])

  useEffect(() => {
    const filteredIngr = selectedIngr.filter((ingredientList) => ingredientList.enabled)

    setFieldValue('ingredientList', filteredIngr)
  }, [selectedIngr, setFieldValue])

  return (
    <div className={classNames(cls.wrapper, [className])}>
      <Uploader label={t('FORM.TITLE_IMAGE_OR_VIDEO.LABEL')} setImage={setImage} />
      <FormItem hidden name='cover' required />
      <Uploader
        label={t('FORM.TITLE_VIDEO_PLACEHOLDER.LABEL')}
        setImage={setVideoPlaceHolder}
        formats={acceptedFormatOnlyImages}
        description='FORM.UPLOADER_ONLY_IMAGES.PLACEHOLDER'
      />
      <FormItem hidden name='coverPlaceholder' />
      <FormItem
        name='title'
        rules={[{ required: true }, { max: 128 }]}
        label={t('FORM.TITLE.LABEL')}
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
      <FormItem name='isVisible' hidden />
      <Space className={cls.space}>
        <Switch onChange={(checked) => setFieldValue('isVisible', checked)} />
        <Text size={ETextSizes.PGS}>{t('FORM.VISIBLE_FOR_CUSTOMERS.LABEL')}</Text>
      </Space>
      <FormItem name='categories' label={t('FORM.CATEGORY.LABEL')}>
        <Select options={recipeCategoryOptions} mode='multiple' />
      </FormItem>
      <FormItem name='properties' label={t('FORM.PROPERTY.LABEL')}>
        <Select options={recipePropertyOptions} mode='multiple' />
      </FormItem>
      <FormItem
        name='duration'
        rules={[{ required: true }]}
        label={t('FORM.TIME_FOR_PREPARE.LABEL')}
      >
        <InputText suffix='Min' onKeyDown={validateInputNumber} />
      </FormItem>
      <FormItem name='ingredientList' hidden />
      <IngredientsCalculator setSelectedIngr={setSelectedIngr} selectedIngr={selectedIngr} />
      <SectionList />
    </div>
  )
}
