import { Form, Space, Switch } from 'antd'
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
import {
  ICustomIngredientsField,
  ISelectedIngredient,
} from '~/lib/components/ingredients-calculator/types'
import { SectionList } from './section-list'
import {
  ERecipeCategoryEnum,
  ERecipePropertyEnum,
  IFile,
  IIngredient,
  ISection,
} from '~/lib/api/types'
import { validateInputNumber } from '~/shared/utils/form'
import { acceptedFormatOnlyImages } from '~/lib/constants/file-formats'

interface IFormFieldsProps {
  className?: string
  initialValues: {
    title: string | undefined
    isOneServing: boolean | undefined
    categories: ERecipeCategoryEnum[] | undefined
    properties: ERecipePropertyEnum[] | undefined
    duration: number | undefined
    ingredientList: IIngredient[] | undefined
    customIngredients: IIngredient[] | undefined
    isVisible: boolean | undefined
    description: string | undefined
    cover: IFile | undefined
    coverPlaceholder: IFile | undefined | null
    sections: ISection[] | undefined
    carbohydrate: number | undefined
    fat: number | undefined
    protein: number | undefined
    energy: number | undefined
  }
}

export const FormFields: FC<IFormFieldsProps> = ({ className, initialValues }) => {
  const { t } = useTranslation()
  const form = useFormInstance()
  const [image, setImage] = useState<File | null>(null)
  const [imagePlaceholder, setImagePlaceholder] = useState<File | null>(null)
  const initialIngredients: ISelectedIngredient[] = initialValues.ingredientList
    ? initialValues.ingredientList.map((item) => {
        const data: ISelectedIngredient = {
          name: item.food,
          enabled: true,
          measure: item.measure,
          quantity: item.quantity,
          energy: item.energy,
          carbohydrate: item.carbohydrate,
          protein: item.protein,
          fat: item.fat,
          possibleUnits: item.possibleUnits || [],
          isCustom: item.isCustom || false,
        }
        return data
      })
    : []

  const initialCustomIngredients: ICustomIngredientsField[] = initialValues.customIngredients
    ? initialValues.customIngredients.map((item) => {
        const data: ICustomIngredientsField = {
          name: item.food,
          enabled: true,
          measure: item.measure,
          quantity: item.quantity,
          energy: item.energy,
          carbohydrate: item.carbohydrate,
          protein: item.protein,
          fat: item.fat,
        }
        return data
      })
    : []

  const [selectedIngr, setSelectedIngr] = useState<ISelectedIngredient[]>(initialIngredients)

  const isVisibleValue = Form.useWatch('isVisible', form)

  useEffect(() => {
    form.setFieldValue('cover', image)
  }, [image, form.setFieldValue, form])

  useEffect(() => {
    form.setFieldValue('coverPlaceholder', imagePlaceholder)
  }, [imagePlaceholder, form.setFieldValue, form])

  useEffect(() => {
    const filteredIngr = selectedIngr.filter((ingredientList) => ingredientList.enabled)

    form.setFieldValue('ingredientList', filteredIngr)
  }, [selectedIngr, form.setFieldValue, form])

  return (
    <div className={classNames(cls.wrapper, [className])}>
      <Uploader
        label={t('FORM.TITLE_IMAGE_OR_VIDEO.LABEL')}
        setImage={setImage}
        initialFiles={initialValues.cover ? [initialValues.cover] : []}
      />
      <FormItem hidden name='cover' required />

      <Uploader
        label={t('FORM.TITLE_VIDEO_PLACEHOLDER.LABEL')}
        setImage={setImagePlaceholder}
        initialFiles={initialValues.coverPlaceholder ? [initialValues.coverPlaceholder] : []}
        formats={acceptedFormatOnlyImages}
        description='FORM.UPLOADER_ONLY_IMAGES.PLACEHOLDER'
      />
      <FormItem hidden name='coverPlaceholder' />
      <FormItem
        name='title'
        rules={[{ required: true }, { max: 128 }]}
        label={t('FORM.TITLE.LABEL')}
        initialValue={initialValues?.title}
      >
        <InputText />
      </FormItem>
      <FormItem
        name='description'
        rules={[{ min: 3 }, { max: 5120 }]}
        label={t('FORM.DESCRIPTION.LABEL')}
        initialValue={initialValues?.description}
      >
        <TextArea
          placeholder={t('FORM.DESCRIPTION.PLACEHOLDER')}
          autoSize
          showCount
          maxLength={5120}
        />
      </FormItem>
      <FormItem name='isVisible' hidden initialValue={initialValues.isVisible} />
      <Space className={cls.space}>
        <Switch
          onChange={(checked) => form.setFieldValue('isVisible', checked)}
          defaultChecked={initialValues.isVisible}
          checked={isVisibleValue}
        />
        <Text size={ETextSizes.PGS}>{t('FORM.VISIBLE_FOR_CUSTOMERS.LABEL')}</Text>
      </Space>

      <FormItem
        name='categories'
        label={t('FORM.CATEGORY.LABEL')}
        initialValue={initialValues.categories}
      >
        <Select options={recipeCategoryOptions} mode='multiple' />
      </FormItem>
      <FormItem
        name='properties'
        label={t('FORM.PROPERTY.LABEL')}
        initialValue={initialValues.properties}
      >
        <Select options={recipePropertyOptions} mode='multiple' />
      </FormItem>
      <FormItem
        name='duration'
        rules={[{ required: true }]}
        label={t('FORM.TIME_FOR_PREPARE.LABEL')}
        initialValue={initialValues.duration}
      >
        <InputText onKeyDown={validateInputNumber} suffix='Min' />
      </FormItem>
      <FormItem name='ingredientList' hidden />
      <IngredientsCalculator
        setSelectedIngr={setSelectedIngr}
        selectedIngr={selectedIngr}
        initialCustomIngredients={initialCustomIngredients}
        initialProgress={{
          carbohydrate: initialValues.carbohydrate || 0,
          energy: initialValues.energy || 0,
          fat: initialValues.fat || 0,
          protein: initialValues.protein || 0,
        }}
      />

      <SectionList sections={initialValues.sections} />
    </div>
  )
}
