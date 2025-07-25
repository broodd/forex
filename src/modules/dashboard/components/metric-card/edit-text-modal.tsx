/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/EditTextModal.js
import { Button, Form, Input, Modal, Typography } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'

const { Title } = Typography

const EditTextModal = ({
  visible,
  onCancel,
  onSave,
  initialText,
}: {
  visible: boolean
  onCancel: any
  onSave: any
  initialText: string
}) => {
  const [form] = useForm()

  useEffect(() => {
    if (visible && initialText) {
      form.setFieldsValue({ Text: initialText })
    }
  }, [visible, initialText, form])

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values.Text)
        form.resetFields()
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  return (
    <Modal
      title={
        <Title level={4} style={{ color: '#f3c75d', margin: 0 }}>
          Edit Date Range
        </Title>
      }
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      footer={[
        <Button key='back' onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key='submit'
          type='primary'
          onClick={handleOk}
          style={{ backgroundColor: '#f3c75d', borderColor: '#f3c75d', color: '#1a1a1a' }}
        >
          Save
        </Button>,
      ]}
      styles={{ body: { background: '#2a2a2a', padding: 24 } }}
      style={{ top: 50 }}
    >
      <Form form={form} layout='vertical' name='date_range_edit_form'>
        <Form.Item
          name='Text'
          label={<span style={{ color: 'white' }}>Date Range Text</span>}
          rules={[{ required: true, message: 'Please input the date range!' }]}
        >
          <Input
            style={{ backgroundColor: '#4a4a4a', borderColor: '#6a6a6a', color: 'white' }}
            placeholder='e.g., 09/07/2025 - 16/07/2025'
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditTextModal
