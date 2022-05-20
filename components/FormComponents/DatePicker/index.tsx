import { Form } from 'antd'
import { Moment } from 'moment'
import React, { useState } from 'react'
import ModalDate from './ModalDate'
const DatePicker = ({ item }: { item: { label: string; name: string; required: boolean; type: string } }) => {
  const [showDate, setShowDate] = useState<boolean>(false)
  const [value, setValue] = useState<Moment | undefined>()
  return (
    <Form.Item>
      <div className="relative">
        <p className="font-Helvetica block mb-2 text-base font-normal text-black">{item.label}</p>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>

        <input
          onClick={() => setShowDate(!showDate)}
          type="text"
          readOnly
          value={value ? value.locale('es').format('LL') : ''}
          className="bg-gray-50 border border-gray-200 text-gray-900 text-md rounded-sm focus:ring-gold focus:border-gold block w-full p-2.5"
          placeholder={item.label}
        />
        <ModalDate datePickerValue={value} setDatePickerValue={setValue} setShowDatePicker={setShowDate} showDatePicker={showDate} />
      </div>
    </Form.Item>
  )
}

export default DatePicker
