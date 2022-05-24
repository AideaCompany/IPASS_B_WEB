import { Form } from 'antd'
import moment, { Moment } from 'moment'
import React, { useEffect, useState } from 'react'
import ModalDate from './ModalDate'
const DatePicker = ({ item }: { item: { label: string; name: string; required: boolean; type: string } }) => {
  const MyDatePicker = ({ onChange, value }: { onChange: (value: Moment | '') => void; value: Moment }) => {
    const [showDate, setShowDate] = useState<boolean>(false)
    const [currentValue, setCurrentValue] = useState<Moment | undefined>(value ? value : undefined)
    useEffect(() => {
      if (!value) {
        onChange('')
      }
    }, [])
    return (
      <div className="relative">
        <label className="font-Helvetica block flex items-center	 mb-2 text-base font-normal text-black">
          {`${item.label} `}
          &nbsp;
          <p style={{ color: 'gray' }} className="font-Helvetica text-xs">{`${item.required ? '' : '(Opcional)'}`}</p>
        </label>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>

        <input
          onClick={() => setShowDate(!showDate)}
          type="text"
          readOnly
          value={currentValue ? moment(currentValue).locale('es').format('LL') : ''}
          className="bg-gray-50 border border-gray-200 text-gray-900 text-md rounded-sm focus:ring-gold focus:border-gold block w-full p-2.5"
          placeholder={item.label}
        />
        <ModalDate
          datePickerValue={currentValue}
          setDatePickerValue={val => {
            setCurrentValue(val)
            onChange(val as Moment)
          }}
          setShowDatePicker={setShowDate}
          showDatePicker={showDate}
        />
      </div>
    )
  }

  return (
    <Form.Item name={item.name} style={{ margin: 0 }} rules={[{ required: item.required, message: `El campo es requerido` }]}>
      {
        //@ts-ignore
        <MyDatePicker />
      }
    </Form.Item>
  )
}

export default DatePicker
