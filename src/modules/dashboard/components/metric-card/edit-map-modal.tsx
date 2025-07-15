/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/EditTrafficMapModal.js
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import {
  Button,
  ColorPicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Typography,
} from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useState } from 'react'

const { Title } = Typography
const { Option } = Select

// A simplified list of countries for demonstration
const ALL_COUNTRIES = [
  { name: 'Albania', color: '#ff7300', coordinates: [19.8167, 41.3333] }, // Tirana
  { name: 'Armenia', color: '#8884d8', coordinates: [44.5167, 40.1833] }, // Yerevan
  { name: 'Australia', color: '#a4de6c', coordinates: [149.13, -35.2809] }, // Canberra
  { name: 'Austria', color: '#ff7300', coordinates: [16.3667, 48.2] }, // Vienna
  { name: 'Azerbaijan', color: '#82ca9d', coordinates: [49.8922, 40.3776] }, // Baku
  { name: 'Belarus', color: '#c358ff', coordinates: [27.5667, 53.9] }, // Minsk
  { name: 'Belgium', color: '#d0ed57', coordinates: [4.35, 50.85] }, // Brussels
  { name: 'Bosnia and Herzegovina', color: '#ffc658', coordinates: [18.4131, 43.8563] }, // Sarajevo
  { name: 'Brazil', color: '#a4de6c', coordinates: [-47.8825, -15.7942] }, // Brasília
  { name: 'Bulgaria', color: '#8884d8', coordinates: [23.3218, 42.6977] }, // Sofia
  { name: 'Canada', color: '#82ca9d', coordinates: [-75.6972, 45.4215] }, // Ottawa
  { name: 'China', color: '#82ca9d', coordinates: [116.4074, 39.9042] }, // Beijing
  { name: 'Croatia', color: 'orange', coordinates: [15.9819, 45.815] }, // Zagreb
  { name: 'Cyprus', color: '#ff7300', coordinates: [33.362, 35.1754] }, // Nicosia
  { name: 'Czech Republic', color: 'green', coordinates: [14.4378, 50.0755] }, // Prague
  { name: 'Denmark', color: '#8884d8', coordinates: [12.5683, 55.6761] }, // Copenhagen
  { name: 'Estonia', color: '#c358ff', coordinates: [24.7535, 59.437] }, // Tallinn
  { name: 'Finland', color: '#ff7300', coordinates: [24.9384, 60.1695] }, // Helsinki
  { name: 'France', color: '#a0a0ff', coordinates: [2.3522, 48.8566] }, // Paris
  { name: 'Georgia', color: '#d0ed57', coordinates: [44.7833, 41.6944] }, // Tbilisi
  { name: 'Germany', color: '#ff7300', coordinates: [13.405, 52.52] }, // Berlin
  { name: 'Greece', color: '#8884d8', coordinates: [23.7275, 37.9838] }, // Athens
  { name: 'Hungary', color: '#82ca9d', coordinates: [19.0402, 47.4979] }, // Budapest
  { name: 'Iceland', color: '#c358ff', coordinates: [-21.8954, 64.1283] }, // Reykjavik
  { name: 'India', color: '#ffc658', coordinates: [77.209, 28.6139] }, // New Delhi
  { name: 'Ireland', color: '#ff7300', coordinates: [-6.2603, 53.3498] }, // Dublin
  { name: 'Italy', color: 'orange', coordinates: [12.4964, 41.9028] }, // Rome
  { name: 'Japan', color: '#a0a0ff', coordinates: [139.6917, 35.6895] }, // Tokyo
  { name: 'Kosovo', color: '#d0ed57', coordinates: [21.1667, 42.6667] }, // Pristina
  { name: 'Latvia', color: '#ffc658', coordinates: [24.1052, 56.9496] }, // Riga
  { name: 'Liechtenstein', color: '#a0a0ff', coordinates: [9.5212, 47.14] }, // Vaduz
  { name: 'Lithuania', color: '#8884d8', coordinates: [25.2798, 54.6872] }, // Vilnius
  { name: 'Luxembourg', color: '#82ca9d', coordinates: [6.1296, 49.6117] }, // Luxembourg City
  { name: 'Malta', color: '#ff7300', coordinates: [14.5146, 35.8989] }, // Valletta
  { name: 'Moldova', color: '#c358ff', coordinates: [28.858, 47.0169] }, // Chisinau
  { name: 'Monaco', color: '#d0ed57', coordinates: [7.4128, 43.7333] }, // Monaco
  { name: 'Montenegro', color: '#ffc658', coordinates: [19.2597, 42.4411] }, // Podgorica
  { name: 'Netherlands', color: '#a0a0ff', coordinates: [4.8952, 52.3702] }, // Amsterdam
  { name: 'North Macedonia', color: '#8884d8', coordinates: [21.43, 41.9965] }, // Skopje
  { name: 'Norway', color: '#82ca9d', coordinates: [10.7522, 59.9139] }, // Oslo
  { name: 'Poland', color: '#c358ff', coordinates: [21.0122, 52.2297] }, // Warsaw
  { name: 'Portugal', color: '#ff7300', coordinates: [-9.1393, 38.7223] }, // Lisbon
  { name: 'Romania', color: '#d0ed57', coordinates: [26.1025, 44.4268] }, // Bucharest
  { name: 'Russia', color: '#8884d8', coordinates: [37.6173, 55.7558] }, // Moscow (European part is relevant)
  { name: 'San Marino', color: '#ffc658', coordinates: [12.446, 43.9361] }, // San Marino
  { name: 'Serbia', color: '#a0a0ff', coordinates: [20.4489, 44.7872] }, // Belgrade
  { name: 'Slovakia', color: '#8884d8', coordinates: [17.1067, 48.1486] }, // Bratislava
  { name: 'Slovenia', color: '#82ca9d', coordinates: [14.5058, 46.0569] }, // Ljubljana
  { name: 'Spain', color: 'red', coordinates: [-3.7038, 40.4168] }, // Madrid
  { name: 'Sweden', color: '#c358ff', coordinates: [18.0686, 59.3293] }, // Stockholm
  { name: 'Switzerland', color: '#ff7300', coordinates: [7.4474, 46.948] }, // Bern
  { name: 'Turkey', color: '#d0ed57', coordinates: [32.8597, 39.9334] }, // Ankara (capital, though Istanbul is largest European city)
  { name: 'Ukraine', color: 'gold', coordinates: [30.5234, 50.4501] }, // Kyiv
  { name: 'United Kingdom', color: '#d0ed57', coordinates: [-0.1278, 51.5074] }, // London
  { name: 'United States', color: '#8884d8', coordinates: [-77.0369, 38.9072] }, // Washington, D.C.
]

export const EditTrafficMapModal = ({
  visible,
  onCancel,
  onSave,
  initialTrafficMapData,
}: {
  visible: boolean
  onCancel: any
  onSave: any
  initialTrafficMapData: any
}) => {
  const [form] = useForm()
  const [dataSource, setDataSource] = useState([])
  const [editingKey, setEditingKey] = useState('')

  // Set initial data and assign unique keys for the table
  useEffect(() => {
    if (visible && initialTrafficMapData) {
      // Ensure data has unique keys for Antd Table if not already present
      const dataWithKeys = initialTrafficMapData.map((item: any, index: any) => ({
        ...item,
        key: item.key || `map-row-${index}-${Math.random().toString(36).substr(2, 9)}`,
        color: item.color || ALL_COUNTRIES.find((c) => c.name === item.name)?.color || '#cccccc', // Default color if not present
        coordinates: ALL_COUNTRIES.find((c) => c.name === item.name)?.coordinates || [0, 0],
      }))
      setDataSource(dataWithKeys)
    }
  }, [visible, initialTrafficMapData])

  const isEditing = (record: any) => record.key === editingKey

  const edit = (record: any) => {
    // Convert hex color to object if necessary for ColorPicker
    form.setFieldsValue({
      ...record,
      coordinates: ALL_COUNTRIES.find((c) => c.name === record.name)?.coordinates || [0, 0],
      // color: typeof record.color === 'string' ? { hex: record.color } : record.color,
    })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (key: string) => {
    try {
      const row = await form.validateFields()
      const newData: any = [...dataSource]
      const index = newData.findIndex((item: any) => key === item.key)

      // Extract hex from color picker object if it's an object
      const savedColor = row.color.toHexString()
      const savedCoord = ALL_COUNTRIES.find((c) => c.name === row.name)?.coordinates || [0, 0]

      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, { ...item, ...row, color: savedColor, coordinates: savedCoord })
        setDataSource(newData)
        setEditingKey('')
      } else {
        newData.push({
          ...row,
          key: `new-row-${Math.random().toString(36).substr(2, 9)}`,
          color: savedColor,
          coordinates: savedCoord,
        })
        setDataSource(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const handleDelete = (key: string) => {
    setDataSource(dataSource.filter((item: any) => item.key !== key))
  }

  const handleAddRow = () => {
    const newKey = `new-map-row-${Math.random().toString(36).substr(2, 9)}`
    const newRow = {
      key: newKey,
      name: '',
      value: 0,
      percentage: '0%',
      color: '#cccccc',
      coordinates: [0, 0],
    }
    setDataSource([...dataSource, newRow] as any)
    edit(newRow) // Immediately put the new row into edit mode
  }

  const columns = [
    {
      title: 'Country',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      editable: true,
      render: (text: string) => <span style={{ color: 'white' }}>{text}</span>,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width: 100,
      editable: true,
      render: (text: string) => <span style={{ color: 'white' }}>{text}</span>,
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
      width: 120,
      editable: true,
      render: (text: string) => <span style={{ color: 'white' }}>{text}</span>,
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      width: 80,
      editable: true,
      render: (text: string) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              backgroundColor: text,
              width: 20,
              height: 20,
              borderRadius: '50%',
              border: '1px solid #555',
            }}
          ></div>
        </div>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      width: 150,
      render: (_some: any, record: any) => {
        const editable = isEditing(record)
        return editable ? (
          <Space>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8, color: '#f3c75d' }}
            >
              Save
            </Typography.Link>
            <Popconfirm title='Sure to cancel?' onConfirm={cancel}>
              <a style={{ color: '#ff4d4f' }}>Cancel</a>
            </Popconfirm>
          </Space>
        ) : (
          <Space>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
              style={{ color: '#52c41a' }}
            >
              Edit
            </Typography.Link>
            <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record.key)}>
              <DeleteOutlined style={{ color: '#ff4d4f', cursor: 'pointer' }} />
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType:
          col.dataIndex === 'value' ? 'number' : col.dataIndex === 'color' ? 'colorpicker' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  const EditableCell = ({ editing, dataIndex, title, inputType, children, ...restProps }: any) => {
    let inputNode
    if (inputType === 'number') {
      inputNode = (
        <InputNumber
          style={{
            width: '100%',
            backgroundColor: '#4a4a4a',
            borderColor: '#6a6a6a',
            color: 'white',
          }}
        />
      )
    } else if (inputType === 'colorpicker') {
      inputNode = (
        // <Input style={{ backgroundColor: '#4a4a4a', borderColor: '#6a6a6a', color: 'white' }} />
        <ColorPicker
          showText
          format='hex'
          disabledAlpha
          style={{ backgroundColor: '#4a4a4a', borderColor: '#6a6a6a' }}
          // Ensure the value is converted to a proper ColorPicker object on initial load
          // The form.setFieldsValue in edit() handles this already.
        />
      )
    } else if (dataIndex === 'name') {
      // Special handling for country select
      inputNode = (
        <Select
          showSearch
          placeholder='Select a country'
          optionFilterProp='children'
          filterOption={(input, option) =>
            ((option?.children || '') as any).toLowerCase().includes(input.toLowerCase())
          }
          style={{ backgroundColor: '#4a4a4a', color: 'white' }}
          dropdownStyle={{ backgroundColor: '#3a3a3a', color: 'white' }}
          bordered={false}
        >
          {ALL_COUNTRIES.map((country) => (
            <Option key={country.name} value={country.name} style={{ color: 'white' }}>
              {country.name}
            </Option>
          ))}
        </Select>
      )
    } else {
      inputNode = (
        <Input style={{ backgroundColor: '#4a4a4a', borderColor: '#6a6a6a', color: 'white' }} />
      )
    }

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    )
  }

  return (
    <Modal
      title={
        <Title level={4} style={{ color: '#f3c75d', margin: 0 }}>
          Edit Traffic Map Data
        </Title>
      }
      visible={visible}
      onCancel={onCancel}
      width='90%' // Adjust width as needed
      footer={[
        <Button key='back' onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key='submit'
          type='primary'
          onClick={() => onSave(dataSource)}
          style={{ backgroundColor: '#f3c75d', borderColor: '#f3c75d', color: '#1a1a1a' }}
        >
          Save All Changes
        </Button>,
      ]}
      bodyStyle={{ background: '#2a2a2a', padding: 24 }}
      style={{ top: 50 }}
    >
      <Button
        onClick={handleAddRow}
        type='primary'
        style={{
          marginBottom: 16,
          backgroundColor: '#52c41a',
          borderColor: '#52c41a',
          color: 'white',
        }}
        icon={<PlusOutlined />}
      >
        Add a row
      </Button>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={dataSource}
          columns={mergedColumns}
          pagination={false}
          rowClassName='editable-row'
          style={{ background: '#2a2a2a', color: 'white' }}
          className='dark-table-modal'
        />
      </Form>
    </Modal>
  )
}
