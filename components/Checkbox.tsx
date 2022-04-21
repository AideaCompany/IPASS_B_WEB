import { Form } from 'antd'
import React, { FC, useState } from 'react'

const Checkbox: FC<{ name: string; label: string | React.ReactNode }> = ({ name, label }) => {
  return (
    <div className="custom_checkbox flex items-center">
      <Form.Item name={name} valuePropName={'checked'} noStyle>
        <input
          className="form-check-input accent-black h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="checkbox"
        />
      </Form.Item>
      <label className="form-check-label inline-block h-4 text-Gothic">{label}</label>
    </div>
  )
}

export default Checkbox
