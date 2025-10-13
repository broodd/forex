/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, Modal } from 'antd'
import { useState } from 'react'
import { dayjs, Dayjs } from '~/shared/providers'
const { RangePicker } = DatePicker

const EditDateModal = ({
  visible,
  onCancel,
  onSave,
  initialRange,
}: {
  visible: boolean
  onCancel: any
  onSave: (dates: Dayjs[]) => void
  initialRange: Dayjs[]
}) => {
  const [dateRange, setDateRange] = useState([dayjs(initialRange[0]), dayjs(initialRange[1])])

  return (
    <Modal
      title='Зміна діапазону дат'
      open={visible} // Зверніть увагу, що у сучасних версіях antd використовується `open` замість `visible`
      onOk={() => onSave(dateRange)}
      onCancel={onCancel}
      okText='Зберегти'
      cancelText='Скасувати'
      // destroyOnClose={true} // Гарна практика, щоб RangePicker оновлювався при кожному відкритті
    >
      <p style={{ marginBottom: 15 }}>Оберіть новий діапазон:</p>
      {/* 3. RangePicker для вибору дат */}
      <RangePicker
        format='DD/MM/YYYY'
        // Встановлюємо поточне (тимчасове) значення
        value={[dateRange[0], dateRange[1]]}
        // Обробник зміни
        onChange={(dates) => {
          setDateRange(dates as unknown as [Dayjs, Dayjs])
        }}
        style={{ width: '100%' }}
      />
    </Modal>
  )
}

export default EditDateModal
