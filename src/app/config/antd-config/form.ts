import i18n from '~/i18n'
// Available values find here https://github.com/react-component/field-form/blob/master/src/utils/messages.ts

export const form = {
  validateMessages: {
    required: i18n.t('FORM.VALIDATE_MESSAGES.REQUIRED'),
    types: {
      string: i18n.t('FORM.VALIDATE_MESSAGES.TYPES.STRING'),
      number: i18n.t('FORM.VALIDATE_MESSAGES.TYPES.NUMBER'),
      email: i18n.t('FORM.VALIDATE_MESSAGES.TYPES.EMAIL'),
    },
  },
}
