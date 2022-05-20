import { Form } from 'antd'
import React from 'react'

const InputNumber = ({ item }: { item: { label: string; name: string; required: boolean; type: string } }) => {
  return (
    <Form.Item noStyle name={item.name} required={item.required}>
      <div className="mb-6">
        <p className="font-Helvetica block mb-2 text-base font-normal text-black">{item.label}</p>
        <input
          type={'number'}
          className="bg-gray-50 border border-gray-200 text-gray-900 text-md rounded-sm focus:ring-gold focus:border-gold block w-full p-2.5"
          placeholder={item.label}
        />
      </div>
    </Form.Item>
  )
}

export default InputNumber
