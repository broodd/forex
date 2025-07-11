import { useTranslation } from 'react-i18next'

import { PageLayout } from '~/layouts'
import { RecipeCreation, RecipeEdit, RecipesTable, RecipeView } from '~/modules/recipes/components'
import { EDrawerRecipesKeys } from '~/modules/recipes/types'
import { Button } from '~/shared/ui/button'
import { Drawer, DrawerProvider } from '~/shared/ui/drawer'
import { useDrawerContext } from '~/shared/ui/drawer/hooks'
import { AddIcon } from '~/shared/ui/icon'
import cls from './recipes-page.module.scss'

const RecipesBasePage = () => {
  const { t } = useTranslation()
  const { openDrawer } = useDrawerContext()

  return (
    <>
      <PageLayout
        className={cls.wrapper}
        header={{
          title: t('PAGES.RECIPES.TITLE')!,
          extra: (
            <Button
              icon={<AddIcon />}
              type='primary'
              onClick={() => openDrawer(EDrawerRecipesKeys.RECIPE_CREATION)}
            >
              {t('PAGES.RECIPES.BTN_ADD')}
            </Button>
          ),
        }}
      >
        <RecipesTable />
      </PageLayout>
      <Drawer elements={[RecipeView, RecipeCreation, RecipeEdit]} />
    </>
  )
}

export const RecipesPage = () => (
  <DrawerProvider>
    <RecipesBasePage />
  </DrawerProvider>
)

export default RecipesPage
