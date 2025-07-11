import { Flex, InputNumber, List } from 'antd'
import classNames from 'classnames'
import { Dispatch, FC, SetStateAction } from 'react'
import { Button } from '~/shared/ui/button'
import { Checkbox } from '~/shared/ui/checkbox'
import { DeleteIcon, MinusIcon, PlusIcon } from '~/shared/ui/icon'
import { Select } from '~/shared/ui/select'
import { ETextSizes, Text } from '~/shared/ui/text'
import { validateInputWithFractionalNumbers } from '~/shared/utils/form'
import { ICustomIngredientsField, ISelectedIngredient } from '../../types'
import { AddCustom } from '../add-custom/add-custom'
import cls from './ingredients-list.module.scss'

interface IIngredientsListProps {
  className?: string
  ingredients?: ISelectedIngredient[]
  setSelectedIngr: Dispatch<SetStateAction<ISelectedIngredient[]>>
  initialCustomIngredients?: ICustomIngredientsField[]
}

export const IngredientsList: FC<IIngredientsListProps> = ({
  className,
  ingredients,
  setSelectedIngr,
  initialCustomIngredients,
}) => {
  const onSelectMeasure = (measure: string, ingredientName: string) => {
    setSelectedIngr((prev) =>
      prev.map((item) => (item.name === ingredientName ? { ...item, measure } : item)),
    )
  }

  const onChangeNumber = (value: string | number | null, ingredientName: string) => {
    setSelectedIngr((prev) =>
      prev.map((item) =>
        item.name === ingredientName ? { ...item, quantity: value ? Number(value) : 0 } : item,
      ),
    )
  }

  const onEnabledChange = (checked: boolean, ingredientName: string) => {
    setSelectedIngr((prev) =>
      prev.map((item) => (item.name === ingredientName ? { ...item, enabled: checked } : item)),
    )
  }

  const onDelete = (ingredientName: string) => {
    setSelectedIngr((prev) => prev.filter((item) => item.name !== ingredientName))
  }

  return (
    <>
      {ingredients && ingredients.length > 0 && (
        <List
          className={cls.list}
          split={false}
          grid={{ gutter: [0, 4], column: 1 }}
          dataSource={ingredients}
          renderItem={(item) => (
            <List.Item style={{ width: '100%' }}>
              <Flex
                className={classNames({
                  [cls.wrapper]: true,
                  [className as string]: !!className,
                })}
              >
                <Flex justify='space-between' align='center' className={cls.flex}>
                  <Button
                    danger
                    type='link'
                    icon={<DeleteIcon style={{ fontSize: 24 }} />}
                    onClick={() => onDelete(item.name)}
                  />
                  <Checkbox
                    checked={item.enabled}
                    onChange={(e) => onEnabledChange(e.target.checked, item.name)}
                  >
                    {item.name}
                  </Checkbox>
                  <Text
                    size={ETextSizes.PGR}
                    className={cls.text}
                  >{`${item.protein ? item.protein : '-'} P ${item.fat ? item.fat : '-'} F ${item.carbohydrate ? item.carbohydrate : '-'} C | ${item.energy ? item.energy : '-'}kcal`}</Text>
                </Flex>
                <Flex align='center' gap={16} className={cls.flex} justify='space-between'>
                  <Select
                    size='small'
                    className={cls.input}
                    value={item.measure}
                    options={item.possibleUnits?.map((unit) => ({ label: unit, value: unit }))}
                    onChange={(value) => onSelectMeasure(value, item.name)}
                  />
                  <InputNumber
                    size='middle'
                    controls={{
                      downIcon: <MinusIcon style={{ fontSize: 14 }} />,
                      upIcon: <PlusIcon style={{ fontSize: 14 }} />,
                    }}
                    value={item.quantity}
                    onChange={(value) => onChangeNumber(value, item.name)}
                    className={cls.input}
                    onKeyDown={validateInputWithFractionalNumbers}
                  />
                </Flex>
              </Flex>
            </List.Item>
          )}
        />
      )}
      <AddCustom initialCustomIngredients={initialCustomIngredients} />
    </>
  )
}
