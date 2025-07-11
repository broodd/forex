import { Flex } from 'antd'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { DetailsCard, InfoList } from '~/lib/components'
import { DrawerBody, DrawerCard, DrawerElement, DrawerHeader } from '~/shared/ui/drawer'
import { Spin } from '~/shared/ui/spin'
import { EDrawerRecipesKeys } from '../../types'
import cls from './recipe-view.module.scss'
import { useActions, useRecipeDetails } from './hooks'
import { RecipePreview } from '../recipe-preview/recipe-preview'

export const RecipeView = () => {
  const { t } = useTranslation()
  const { recipe, isLoading } = useRecipeDetails()
  const { onDeleteClick, onEdit } = useActions()
  return (
    <DrawerElement drawerKey={EDrawerRecipesKeys.RECIPE_VIEW}>
      <DrawerCard>
        <DrawerHeader
          title={t('PAGES.RECIPES.DETAILS.TITLE_RECIPE')}
          onDelete={onDeleteClick}
          onEdit={onEdit}
        />
        <DrawerBody className={cls.body}>
          <Spin spinning={isLoading}>
            {recipe && (
              <Flex vertical gap={24} className={classNames(cls.wrapper)}>
                <DetailsCard
                  cover={recipe.cover?.src}
                  title={recipe.title}
                  description={recipe.description}
                  coverType={recipe.cover?.mimetype}
                  videoPlaceholder={recipe.coverPlaceholder?.src}
                />
                <InfoList
                  options={[
                    { label: t('TABLE.COLUMNS.TITLE'), value: recipe.title },
                    {
                      label: t('TABLE.COLUMNS.CATEGORY'),
                      value: recipe.categories ? recipe.categories.join(', ') : '',
                    },
                    {
                      label: t('TABLE.COLUMNS.VISIBLE_FOR_CUSTOMERS'),
                      value: recipe.isVisible
                        ? t('ACTIONS.IS_VISIBLE')
                        : t('ACTIONS.IS_NOT_VISIBLE'),
                    },
                    {
                      label: t('TABLE.COLUMNS.VIEWS'),
                      value: recipe.viewsCount.toString(),
                    },
                    {
                      label: t('TABLE.COLUMNS.RECIPE_PREVIEW'),
                      value: '',
                    },
                  ]}
                />
                <RecipePreview recipe={recipe} />
              </Flex>
            )}
          </Spin>
        </DrawerBody>
      </DrawerCard>
    </DrawerElement>
  )
}
