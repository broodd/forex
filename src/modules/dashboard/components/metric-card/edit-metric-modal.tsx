/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Form, Input, InputNumber, Modal, Switch, Typography } from 'antd'
import { useEffect } from 'react'

const { Title } = Typography

export const EditMetricModal = ({
  visible,
  onCancel,
  onSave,
  initialValues,
}: {
  visible: boolean
  onCancel: any
  onSave: any
  initialValues: any
}) => {
  const [form] = Form.useForm()

  // Set form fields when initialValues change (i.e., when a new metric is selected for editing)
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues, form])

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

  return (
    <Modal
      title={
        <Title level={4} style={{ color: '#f3c75d', margin: 0 }}>
          Edit {initialValues?.title || 'Metric'}
        </Title>
      }
      open={visible}
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
      styles={{ body: { background: '#2a2a2a', padding: 24 } }} // Dark background for modal content
      style={{ top: 50 }} // Position modal higher
    >
      <Form form={form} layout='vertical' name='edit_metric_form' initialValues={initialValues}>
        <Form.Item
          name='value'
          label={<span style={{ color: 'white' }}>Value</span>}
          rules={[{ required: true, message: 'Please input the value!' }]}
        >
          {/* Use Input for percentages like "100%" or numbers that might have symbols */}
          {/* Or use InputNumber for strictly numerical values */}
          {typeof initialValues?.value === 'number' ? (
            <InputNumber
              style={{
                width: '100%',
                backgroundColor: '#4a4a4a',
                borderColor: '#6a6a6a',
                color: 'white',
              }}
            />
          ) : (
            <Input style={{ backgroundColor: '#4a4a4a', borderColor: '#6a6a6a', color: 'white' }} />
          )}
        </Form.Item>

        <Form.Item
          name='calcByFormula'
          label={<span style={{ color: 'white' }}>Рахувати по формулі?</span>}
          valuePropName='checked' // Essential for Switch component
          style={{ marginBottom: 0 }}
        >
          <Switch />
        </Form.Item>
        <br />
        <Form.Item
          name='percentage'
          label={<span style={{ color: 'white' }}>Percentage</span>}
          rules={[{ required: true, message: 'Please input the percentage!' }]}
        >
          <Input style={{ backgroundColor: '#4a4a4a', borderColor: '#6a6a6a', color: 'white' }} />
        </Form.Item>
        <Form.Item
          name='today'
          label={<span style={{ color: 'white' }}>Today's Value</span>}
          rules={[{ required: true, message: "Please input today's value!" }]}
        >
          {typeof initialValues?.today === 'number' ? (
            <InputNumber
              style={{
                width: '100%',
                backgroundColor: '#4a4a4a',
                borderColor: '#6a6a6a',
                color: 'white',
              }}
            />
          ) : (
            <Input style={{ backgroundColor: '#4a4a4a', borderColor: '#6a6a6a', color: 'white' }} />
          )}
        </Form.Item>
        <Form.Item
          name='yesterday'
          label={<span style={{ color: 'white' }}>Yesterday's Value</span>}
          rules={[{ required: true, message: "Please input yesterday's value!" }]}
        >
          {typeof initialValues?.yesterday === 'number' ? (
            <InputNumber
              style={{
                width: '100%',
                backgroundColor: '#4a4a4a',
                borderColor: '#6a6a6a',
                color: 'white',
              }}
            />
          ) : (
            <Input style={{ backgroundColor: '#4a4a4a', borderColor: '#6a6a6a', color: 'white' }} />
          )}
        </Form.Item>

        <Form.Item
          name='trendLine'
          label={<span style={{ color: 'white' }}>Show Trend Line</span>}
          valuePropName='checked' // Essential for Switch component
          style={{ marginBottom: 0 }}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name='showToday'
          label={<span style={{ color: 'white' }}>Show Today/Yesterday</span>}
          valuePropName='checked' // Essential for Switch component
          style={{ marginTop: 8 }} // Add some spacing between switches
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  )
}
