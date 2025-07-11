import { Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { Button } from '~/shared/ui/button'
import {
  DrawerBody,
  DrawerCard,
  DrawerElement,
  DrawerFooter,
  DrawerHeader,
} from '~/shared/ui/drawer'
import { useDrawerContext } from '~/shared/ui/drawer/hooks'
import { FormItem } from '~/shared/ui/form-item'
import { Spin } from '~/shared/ui/spin'
import { scrollToFirstError } from '~/shared/utils/form'
import { EDrawerRecipesKeys } from '../../types'
import { useCreateRecipe } from './hooks'
import { ICreateRecipeFormValues } from './types'
import { FormFields } from './views'
import { useUploadStore } from '~/lib/store/uploadStore'

export const RecipeCreation = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm<ICreateRecipeFormValues>()
  const { closeDrawer } = useDrawerContext()
  const { onFinish, isLoading } = useCreateRecipe(closeDrawer, form)
  const { isUploadLoading } = useUploadStore()
  return (
    <DrawerElement drawerKey={EDrawerRecipesKeys.RECIPE_CREATION}>
      <Form
        form={form}
        name='create_recipe'
        requiredMark={false}
        layout='vertical'
        autoComplete='on'
        onFinish={onFinish}
        scrollToFirstError={{
          block: 'start',
          behavior: scrollToFirstError,
        }}
      >
        <DrawerCard>
          <DrawerHeader title={t('PAGES.RECIPES.CREATE_RECIPE')} />
          <DrawerBody>
            <Spin spinning={isLoading} percent='auto' size='large'>
              <FormFields />
            </Spin>
          </DrawerBody>
          <DrawerFooter>
            <FormItem shouldUpdate style={{ marginBottom: 0 }}>
              {() => (
                <Button
                  type='primary'
                  block
                  htmlType='submit'
                  disabled={isLoading || isUploadLoading}
                >
                  {t('PAGES.RECIPES.CREATE_RECIPE')}
                </Button>
              )}
            </FormItem>
          </DrawerFooter>
        </DrawerCard>
      </Form>
    </DrawerElement>
  )
}
