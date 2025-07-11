import classNames from 'classnames'
import { FC } from 'react'

import { Flex, Form, InputNumber } from 'antd'
import { useTranslation } from 'react-i18next'
import { Button } from '~/shared/ui/button'
import { Checkbox } from '~/shared/ui/checkbox'
import { FormItem } from '~/shared/ui/form-item'
import { AddIcon, DeleteIcon, MinusIcon, PlusIcon } from '~/shared/ui/icon'
import { InputText } from '~/shared/ui/input-text'
import { validateInputWithFractionalNumbers } from '~/shared/utils/form'
import cls from './add-custom.module.scss'
import { ETextSizes, Text } from '~/shared/ui/text'
import { ICustomIngredientsField } from '../../types'

interface IAddCustomProps {
  className?: string
  initialCustomIngredients?: ICustomIngredientsField[]
}

export const AddCustom: FC<IAddCustomProps> = ({ className, initialCustomIngredients }) => {
  const { t } = useTranslation()

  return (
    <div className={cls.wrapper}>
      <Form.List
        name='customIngredients'
        initialValue={initialCustomIngredients ? initialCustomIngredients : undefined}
      >
        {(fields, { add, remove }) => {
          return (
            <div className={classNames(cls.fieldsWrapper, [className])}>
              {fields.map(({ key, name }) => {
                return (
                  <Form.Item shouldUpdate key={key} noStyle>
                    {(form) => {
                      const proteinValue = form.getFieldValue([
                        'customIngredients',
                        name,
                        'protein',
                      ])
                      const fatValue = form.getFieldValue(['customIngredients', name, 'fat'])
                      const carbohydrateValue = form.getFieldValue([
                        'customIngredients',
                        name,
                        'carbohydrate',
                      ])

                      const energyValue = form.getFieldValue(['customIngredients', name, 'energy'])

                      return (
                        <Flex
                          className={classNames({
                            [cls.item]: true,
                            [className as string]: !!className,
                          })}
                        >
                          <Flex justify='space-between' align='center' className={cls.flex}>
                            <Button
                              danger
                              type='link'
                              icon={<DeleteIcon style={{ fontSize: 24 }} />}
                              onClick={() => remove(name)}
                            />
                            <FormItem name={[name, 'enabled']} noStyle valuePropName='checked'>
                              <Checkbox>{t('ACTIONS.CUSTOM_INGR')}</Checkbox>
                            </FormItem>
                            <Text
                              size={ETextSizes.PGR}
                              className={cls.text}
                            >{`${proteinValue ? proteinValue : '-'} P ${fatValue ? fatValue : '-'} F ${carbohydrateValue ? carbohydrateValue : '-'} C | ${energyValue ? energyValue : '-'}kcal`}</Text>
                          </Flex>
                          <Flex vertical className={cls.flex}>
                            <FormItem
                              name={[name, 'name']}
                              rules={[{ required: true }, { min: 3 }, { max: 128 }]}
                            >
                              <InputText placeholder={t('FORM.NAME_INGR.LABEL')} size='small' />
                            </FormItem>
                            <Flex
                              align='center'
                              gap={16}
                              className={cls.flex}
                              justify='space-between'
                            >
                              <FormItem
                                className={cls.flex}
                                name={[name, 'measure']}
                                rules={[{ required: true }, { max: 128 }]}
                              >
                                <InputText size='small' placeholder={t('FORM.MEASURE.LABEL')} />
                              </FormItem>
                              <FormItem
                                name={[name, 'quantity']}
                                className={cls.flex}
                                rules={[{ required: true }]}
                              >
                                <InputNumber
                                  size='middle'
                                  controls={{
                                    downIcon: <MinusIcon style={{ fontSize: 14 }} />,
                                    upIcon: <PlusIcon style={{ fontSize: 14 }} />,
                                  }}
                                  onKeyDown={validateInputWithFractionalNumbers}
                                  className={cls.inputNumber}
                                />
                              </FormItem>
                            </Flex>
                            <Flex
                              align='center'
                              gap={16}
                              className={cls.flex}
                              justify='space-between'
                            >
                              <div className={cls.label}>
                                <Text size={ETextSizes.SIP}>{t('FORM.PROTEINS.LABEL')}</Text>
                              </div>
                              <FormItem
                                name={[name, 'protein']}
                                className={cls.flex}
                                rules={[{ required: true }]}
                              >
                                <InputNumber
                                  size='middle'
                                  controls={{
                                    downIcon: <MinusIcon style={{ fontSize: 14 }} />,
                                    upIcon: <PlusIcon style={{ fontSize: 14 }} />,
                                  }}
                                  onKeyDown={validateInputWithFractionalNumbers}
                                  className={cls.inputNumber}
                                />
                              </FormItem>
                            </Flex>
                            <Flex
                              align='center'
                              gap={16}
                              className={cls.flex}
                              justify='space-between'
                            >
                              <div className={cls.label}>
                                <Text size={ETextSizes.SIP}>{t('FORM.FAT.LABEL')}</Text>
                              </div>
                              <FormItem
                                name={[name, 'fat']}
                                className={cls.flex}
                                rules={[{ required: true }]}
                              >
                                <InputNumber
                                  size='middle'
                                  controls={{
                                    downIcon: <MinusIcon style={{ fontSize: 14 }} />,
                                    upIcon: <PlusIcon style={{ fontSize: 14 }} />,
                                  }}
                                  onKeyDown={validateInputWithFractionalNumbers}
                                  className={cls.inputNumber}
                                />
                              </FormItem>
                            </Flex>
                            <Flex
                              align='center'
                              gap={16}
                              className={cls.flex}
                              justify='space-between'
                            >
                              <div className={cls.label}>
                                <Text size={ETextSizes.SIP}>{t('FORM.CARBS.LABEL')}</Text>
                              </div>
                              <FormItem
                                name={[name, 'carbohydrate']}
                                className={cls.flex}
                                rules={[{ required: true }]}
                              >
                                <InputNumber
                                  size='middle'
                                  controls={{
                                    downIcon: <MinusIcon style={{ fontSize: 14 }} />,
                                    upIcon: <PlusIcon style={{ fontSize: 14 }} />,
                                  }}
                                  onKeyDown={validateInputWithFractionalNumbers}
                                  className={cls.inputNumber}
                                />
                              </FormItem>
                            </Flex>
                            <Flex
                              align='center'
                              gap={16}
                              className={cls.flex}
                              justify='space-between'
                            >
                              <div className={cls.label}>
                                <Text size={ETextSizes.SIP}>{t('FORM.CKAL.LABEL')}</Text>
                              </div>
                              <FormItem
                                name={[name, 'energy']}
                                className={cls.flex}
                                rules={[{ required: true }]}
                              >
                                <InputNumber
                                  size='middle'
                                  controls={{
                                    downIcon: <MinusIcon style={{ fontSize: 14 }} />,
                                    upIcon: <PlusIcon style={{ fontSize: 14 }} />,
                                  }}
                                  onKeyDown={validateInputWithFractionalNumbers}
                                  className={cls.inputNumber}
                                />
                              </FormItem>
                            </Flex>
                          </Flex>
                        </Flex>
                      )
                    }}
                  </Form.Item>
                )
              })}
              <Button onClick={() => add()} type='primary' icon={<AddIcon />}>
                {t('ACTIONS.ADD_CUSTOM_INGR')}
              </Button>
            </div>
          )
        }}
      </Form.List>
    </div>
  )
}
