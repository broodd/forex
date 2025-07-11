import { Flex } from 'antd'
import classNames from 'classnames'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Progress } from '~/shared/ui/progress'
import { ETextSizes, Text } from '~/shared/ui/text'
import cls from './nutrition-info.module.scss'

interface INutritionInfoProps {
  className?: string
  protein?: number
  fat?: number
  energy?: number
  carbohydrate?: number
}

export const NutritionInfo: FC<INutritionInfoProps> = ({
  className,
  protein = 0,
  fat = 0,
  carbohydrate = 0,
  energy = 0,
}) => {
  const { t } = useTranslation()
  const items = [
    {
      label: t('ACTIONS.KCAL'),
      value: energy,
      max: 2000,
    },
    {
      label: t('ACTIONS.PROTEIN'),
      value: protein,
      max: 50,
    },
    {
      label: t('ACTIONS.CARBS'),
      value: carbohydrate,
      max: 300,
    },
    {
      label: t('ACTIONS.FAT'),
      value: fat,
      max: 65,
    },
  ]
  return (
    <Flex className={classNames(cls.wrapper, [className])} align='center' justify='space-between'>
      {items.map((item, index) => {
        const percent = Math.min(100, (item.value / item.max) * 100)
        return (
          <Flex vertical align='center' key={`${item.label}_${item.value}`}>
            <Progress
              type='circle'
              size={66}
              format={() => item.value + (index !== 0 ? 'g' : '')}
              percent={percent}
            />
            <Text size={ETextSizes.PGS}>{item.label}</Text>
          </Flex>
        )
      })}
    </Flex>
  )
}
