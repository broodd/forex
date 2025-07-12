import { Flex, Image } from 'antd'
import classNames from 'classnames'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ESelectionType, IRecipe, ISection } from '~/lib/api/types'
import { VideoPreview } from '~/lib/components'
import { NutritionInfo } from '~/lib/components/nutrition-info'
import { TimeIcon } from '~/shared/ui/icon'
import { Tag } from '~/shared/ui/tag'
import { ETextSizes, Text } from '~/shared/ui/text'
import { Title } from '~/shared/ui/title'
import cls from './recipe-preview.module.scss'
import React from 'react'

export interface IRecipePreviewProps {
  className?: string
  recipe: IRecipe
}

export const RecipePreview: FC<IRecipePreviewProps> = ({ className, recipe }) => {
  const { t } = useTranslation()
  const isVideo = recipe.cover?.mimetype === 'video/mp4'
  const stepLength = recipe?.sections?.length || 0
  console.log('stepLength', stepLength)
  const prepareStepsRender = (type: ESelectionType, position: number, item: ISection) => {
    const isVideo = item?.file?.mimetype === 'video/mp4'
    switch (type) {
      case ESelectionType.TITLE:
        return (
          <React.Fragment key={item.id}>
            <Text>{stepLength === 1 ? `${item.text}` : `${position + '.'} ${item.text}`}</Text>
          </React.Fragment>
        )
      case ESelectionType.TEXT:
        return (
          <React.Fragment key={item.id}>
            <Text>{stepLength === 1 ? `${item.text}` : `${position + '.'} ${item.text}`}</Text>
          </React.Fragment>
        )
      case ESelectionType.FILE:
        return (
          <React.Fragment key={item.id}>
            {isVideo ? (
              <VideoPreview
                videoUrl={item?.file?.src}
                width={372}
                height={224}
                placeholder={item?.filePlaceholder?.src}
              />
            ) : (
              <Image
                preview={false}
                src={item?.file?.src}
                alt='prepare step image'
                width={372}
                height={224}
              />
            )}
          </React.Fragment>
        )
      default:
        break
    }
  }

  return (
    <div className={classNames(cls.wrapper, [className])}>
      {isVideo ? (
        <VideoPreview
          videoUrl={recipe?.cover?.src}
          width={372}
          height={224}
          placeholder={recipe?.coverPlaceholder?.src}
        />
      ) : (
        <Image
          preview={false}
          src={recipe?.cover?.src}
          alt='recipe cover'
          width={372}
          height={224}
        />
      )}
      <Flex vertical gap={16}>
        <Title level={5} className={cls.title}>
          {recipe?.title}
        </Title>
        {recipe?.description && (
          <Text size={ETextSizes.H7} className={cls.description}>
            {recipe?.description}
          </Text>
        )}
      </Flex>
      <NutritionInfo
        carbohydrate={recipe.carbohydrate}
        energy={recipe.energy}
        fat={recipe.fat}
        protein={recipe.protein}
      />
      <Flex gap={8} wrap>
        <Flex gap={8} align='center' justify='flex-start'>
          <TimeIcon style={{ fontSize: 16 }} />
          <Text size={ETextSizes.PGS}>{`${recipe.duration} min`}</Text>
        </Flex>
        {recipe.categories?.map((item) => (
          <Tag className={cls.tag} key={item}>
            {item}
          </Tag>
        ))}
      </Flex>

      <Flex vertical gap={16} className={cls.flex} justify='flex-start'>
        <Text size={ETextSizes.PGR} className={cls.subTitle}>
          {t('ACTIONS.INGREDIENTS')}
        </Text>
        <ul className={cls.ingredients}>
          {recipe.ingredients?.map((item) => (
            <li key={item.id}>
              <Text>{item.food}</Text>
            </li>
          ))}
        </ul>
      </Flex>

      <Flex vertical gap={16} className={cls.flex} justify='flex-start'>
        {stepLength > 0 && (
          <Text size={ETextSizes.PGR} className={cls.subTitle}>
            {t('ACTIONS.PREPARATION_STEPS')}
          </Text>
        )}

        <>
          {recipe.sections?.map((item, index) => {
            const sectionType = item.type
            return (
              <React.Fragment key={item.id}>
                {prepareStepsRender(sectionType, index + 1, item)}
              </React.Fragment>
            )
          })}
        </>
      </Flex>
    </div>
  )
}
