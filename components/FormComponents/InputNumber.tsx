import { Form } from 'antd'
import React, { useEffect, useState } from 'react'

const InputNumber = ({ item }: { item: { label: string; name: string; required: boolean; type: string } }) => {
  const MyNumberInput = ({ value, onChange }: { onChange: (value: string) => void; value: string }) => {
    const [myValue, setMyValue] = useState(parseInt(value) ?? NaN)
    useEffect(() => {
      if (!value) {
        onChange('')
      }
    }, [])
    return (
      <div className="mb-1">
        <label className="font-Helvetica block flex items-center	 mb-2 text-base font-normal text-black">
          {`${item.label} `}
          &nbsp;
          <p style={{ color: 'gray' }} className="font-Helvetica text-xs">{`${item.required ? '' : '(Opcional)'}`}</p>
        </label>
        <input
          type={'number'}
          value={myValue}
          onChange={e => {
            console.log(typeof e.target.value)
            setMyValue(parseInt(e.target.value))
            onChange(e.target.value)
          }}
          className="bg-gray-50 border border-gray-200 text-gray-900 text-md rounded-sm focus:ring-gold focus:border-gold block w-full p-2.5"
          placeholder={item.label}
        />
      </div>
    )
  }
  console.log(item.required)
  return (
    <Form.Item style={{ margin: 0 }} name={item.name} rules={[{ required: item.required, message: `El campo es requerido` }]}>
      {
        //@ts-ignore
        <MyNumberInput />
      }
    </Form.Item>
  )
}

export default InputNumber
