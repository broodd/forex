import { showConfirmModal } from '~/shared/utils/modals'

import i18n from '~/i18n'
import { ETextSizes, Text } from '~/shared/ui/text'
import cls from './confirm-modals.module.scss'

export const deleteCourseConfirmModal = (onDelete: () => void) => {
  showConfirmModal({
    title: <Text size={ETextSizes.PGS}>{i18n.t('MODALS.DELETE_COURSE.TITLE')}</Text>,
    content: <Text size={ETextSizes.PGS}>{i18n.t('MODALS.DELETE_COURSE.DESCRIPTION')}</Text>,
    cancelButtonProps: { block: true },
    okButtonProps: { block: true },
    okText: i18n.t('ACTIONS.DELETE'),
    cancelText: i18n.t('ACTIONS.CANCEL'),
    onOk: () => onDelete(),
    className: cls.confirmModal,
  })
}

export const deleteWeekConfirmModal = (onDelete: () => void) => {
  showConfirmModal({
    title: <Text size={ETextSizes.PGS}>{i18n.t('MODALS.DELETE_WEEK.TITLE')}</Text>,
    content: <Text size={ETextSizes.PGS}>{i18n.t('MODALS.DELETE_WEEK.DESCRIPTION')}</Text>,
    cancelButtonProps: { block: true },
    okButtonProps: { block: true },
    okText: i18n.t('ACTIONS.DELETE'),
    cancelText: i18n.t('ACTIONS.CANCEL'),
    onOk: () => onDelete(),
    className: cls.confirmModal,
  })
}

export const deleteLessonConfirmModal = (onDelete: () => void) => {
  showConfirmModal({
    title: <Text size={ETextSizes.PGS}>{i18n.t('MODALS.DELETE_LESSON.TITLE')}</Text>,
    content: <Text size={ETextSizes.PGS}>{i18n.t('MODALS.DELETE_LESSON.DESCRIPTION')}</Text>,
    cancelButtonProps: { block: true },
    okButtonProps: { block: true },
    okText: i18n.t('ACTIONS.DELETE'),
    cancelText: i18n.t('ACTIONS.CANCEL'),
    onOk: () => onDelete(),
    className: cls.confirmModal,
  })
}

export const deleteBonusConfirmModal = (onDelete: () => void) => {
  showConfirmModal({
    title: <Text size={ETextSizes.PGS}>{i18n.t('MODALS.DELETE_BONUS.TITLE')}</Text>,
    content: <Text size={ETextSizes.PGS}>{i18n.t('MODALS.DELETE_BONUS.DESCRIPTION')}</Text>,
    cancelButtonProps: { block: true },
    okButtonProps: { block: true },
    okText: i18n.t('ACTIONS.DELETE'),
    cancelText: i18n.t('ACTIONS.CANCEL'),
    onOk: () => onDelete(),
    className: cls.confirmModal,
  })
}

export const deleteDayConfirmModal = (onDelete: () => void) => {
  showConfirmModal({
    title: <Text size={ETextSizes.PGS}>{i18n.t('MODALS.DELETE_DAY.TITLE')}</Text>,
    content: <Text size={ETextSizes.PGS}>{i18n.t('MODALS.DELETE_DAY.DESCRIPTION')}</Text>,
    cancelButtonProps: { block: true },
    okButtonProps: { block: true },
    okText: i18n.t('ACTIONS.DELETE'),
    cancelText: i18n.t('ACTIONS.CANCEL'),
    onOk: () => onDelete(),
    className: cls.confirmModal,
  })
}

export const deleteRecipeConfirmModal = (onDelete: () => void) => {
  showConfirmModal({
    title: <Text size={ETextSizes.PGS}>{i18n.t('MODALS.DELETE_RECIPE.TITLE')}</Text>,
    content: <Text size={ETextSizes.PGS}>{i18n.t('MODALS.DELETE_RECIPE.DESCRIPTION')}</Text>,
    cancelButtonProps: { block: true },
    okButtonProps: { block: true },
    okText: i18n.t('ACTIONS.DELETE'),
    cancelText: i18n.t('ACTIONS.CANCEL'),
    onOk: () => onDelete(),
    className: cls.confirmModal,
  })
}

export const deleteNotificationConfirmModal = (onDelete: () => void) => {
  showConfirmModal({
    title: <Text size={ETextSizes.PGS}>{i18n.t('MODALS.DELETE_NOTIFICATION.TITLE')}</Text>,
    content: <Text size={ETextSizes.PGS}>{i18n.t('MODALS.DELETE_NOTIFICATION.DESCRIPTION')}</Text>,
    cancelButtonProps: { block: true },
    okButtonProps: { block: true },
    okText: i18n.t('ACTIONS.DELETE'),
    cancelText: i18n.t('ACTIONS.CANCEL'),
    onOk: () => onDelete(),
    className: cls.confirmModal,
  })
}
