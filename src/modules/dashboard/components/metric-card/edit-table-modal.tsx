/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/EditTableModal.js
import { Button, Form, Input, InputNumber, Modal, Typography } from 'antd'
import { useEffect } from 'react'

const { Title } = Typography

export const EditTableModal = ({
  visible,
  onCancel,
  onSave,
  initialValues,
  modalTitle = 'Edit Row',
}: {
  visible: boolean
  onCancel: any
  onSave: any
  initialValues: any
  modalTitle: string
}) => {
  const [form] = Form.useForm()

  // Set form fields when initialValues change
  useEffect(() => {
    if (visible) {
      // Only set values if modal is visible to prevent issues when closing
      form.setFieldsValue(initialValues)
    }
  }, [initialValues, form, visible])

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields()
        onSave(values) // Pass the updated values to the parent
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  // Helper to determine input type based on value
  const getInputComponent = (key: string, value: any) => {
    // Basic heuristics: if value is number, or looks like a percentage string
    if (typeof value === 'number') {
      return (
        <InputNumber
          style={{
            width: '100%',
            backgroundColor: '#4a4a4a',
            borderColor: '#6a6a6a',
            color: 'white',
          }}
        />
      )
    }
    // For "Conversion Rate" or "Percentage" fields, allow string input for '%'
    if (key.toLowerCase().includes('percentage') || key.toLowerCase().includes('conversion rate')) {
      return (
        <Input style={{ backgroundColor: '#4a4a4a', borderColor: '#6a6a6a', color: 'white' }} />
      )
    }
    // Default to text input
    return <Input style={{ backgroundColor: '#4a4a4a', borderColor: '#6a6a6a', color: 'white' }} />
  }

  return (
    <Modal
      title={
        <Title level={4} style={{ color: '#f3c75d', margin: 0 }}>
          {modalTitle}
        </Title>
      }
      visible={visible}
      onCancel={onCancel}
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
      bodyStyle={{ background: '#2a2a2a', padding: 24 }} // Dark background for modal content
      style={{ top: 50 }} // Position modal higher
    >
      <Form
        form={form}
        layout='vertical'
        name='edit_table_row_form'
        // initialValues prop here for initial render, useEffect for updates
      >
        {initialValues &&
          Object.keys(initialValues).map((key) => {
            // Skip 'key' if it's just an internal React key for lists
            if (key === 'key') return null

            // Capitalize first letter for label
            const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1') // Add space before uppercase

            return (
              <Form.Item
                key={key}
                name={key}
                label={<span style={{ color: 'white' }}>{label}</span>}
                rules={[{ required: true, message: `Please input the ${label}!` }]}
              >
                {getInputComponent(key, initialValues[key])}
              </Form.Item>
            )
          })}
      </Form>
    </Modal>
  )
}
