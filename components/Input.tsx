import { Form } from 'antd'
import React, { FC } from 'react'

const Input: FC<{
  type?: React.HTMLInputTypeAttribute
  name: string
  placeHolder?: string
  icon?: React.ReactNode
  onClickIcon?: () => void
  required?: boolean
}> = ({ type = 'text', name, placeHolder, icon, required = false, onClickIcon }) => {
  return (
    <Form.Item name={name} rules={[{ required, message: 'Parámetro requerido' }]}>
      <div className="relative">
        <input
          type={type}
          className="custom_input border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-white"
          placeholder={placeHolder}
        />
        {icon && (
          <div
            onClick={onClickIcon}
            className={`text-white absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 ${onClickIcon ? 'cursor-pointer' : ''}`}
          >
            {icon}
          </div>
        )}
      </div>
    </Form.Item>
  )
}

export default Input
