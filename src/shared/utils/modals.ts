import { ModalFuncProps } from 'antd'
import { modal } from './antd-static-functions'

export const showConfirmModal = (props: ModalFuncProps) =>
  modal.confirm({
    icon: null,
    centered: true,
    maskClosable: true,
    closable: true,
    ...props,
    onOk: () => {
      if (props.onOk) props.onOk()
    },
  })
