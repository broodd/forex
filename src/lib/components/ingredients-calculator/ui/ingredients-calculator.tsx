import { Dispatch, FC, SetStateAction, useState } from 'react'
import classNames from 'classnames'
import cls from './ingredients-calculator.module.scss'
import { Search } from '~/shared/ui/search'
import { ETextSizes, Text } from '~/shared/ui/text'
import { useTranslation } from 'react-i18next'
import { AutoComplete, Flex } from 'antd'
import { IngredientsList } from '../views'
import { Button } from '~/shared/ui/button'
import { useSearch } from '../hooks'
import { ICustomIngredientsField, INutritionProgress, ISelectedIngredient } from '../types'
import { NutritionInfo } from '../../nutrition-info'
import { useWatch } from 'antd/es/form/Form'
import useFormInstance from 'antd/es/form/hooks/useFormInstance'

interface IIngredientsCalculatorProps {
  className?: string
  selectedIngr: ISelectedIngredient[]
  setSelectedIngr: Dispatch<SetStateAction<ISelectedIngredient[]>>
  initialProgress?: INutritionProgress | undefined
  initialCustomIngredients?: ICustomIngredientsField[]
}

export const IngredientsCalculator: FC<IIngredientsCalculatorProps> = ({
  className,
  selectedIngr,
  setSelectedIngr,
  initialProgress,
  initialCustomIngredients,
}) => {
  const { t } = useTranslation()
  // const [calculate, setCalculate] = useState(false)
  const [nutritionProgress, setNutritionProgress] = useState<INutritionProgress | undefined>(
    initialProgress,
  )
  const { onSearch, searchValue, onSelect, isLoading, options, onCalculate } = useSearch(
    // selectedIngr,
    setSelectedIngr,
    setNutritionProgress,
  )
  const form = useFormInstance()
  const customIngredientsValues: ICustomIngredientsField[] = useWatch('customIngredients', form)
  const anyCustomIngredients =
    Array.isArray(customIngredientsValues) &&
    customIngredientsValues.some((item) => item?.enabled === true)

  const disabledBtn = !selectedIngr.some((item) => item?.enabled == true) && !anyCustomIngredients

  return (
    <Flex vertical gap={16} className={classNames(cls.wrapper, [className])}>
      <Flex vertical gap={8}>
        <Text size={ETextSizes.PSS}>{t('FORM.INGREDIENTS.LABEL')}</Text>
        <AutoComplete onSearch={onSearch} value={searchValue} onSelect={onSelect} options={options}>
          <Search allowClear />
        </AutoComplete>
      </Flex>
      <IngredientsList
        ingredients={selectedIngr}
        setSelectedIngr={setSelectedIngr}
        initialCustomIngredients={initialCustomIngredients}
      />
      <NutritionInfo
        carbohydrate={nutritionProgress?.carbohydrate}
        energy={nutritionProgress?.energy}
        fat={nutritionProgress?.fat}
        protein={nutritionProgress?.protein}
      />
      <Button
        type='primary'
        disabled={isLoading || disabledBtn}
        onClick={() => onCalculate(selectedIngr)}
      >
        {t('ACTIONS.CALCULATE')}
      </Button>
    </Flex>
  )
}
