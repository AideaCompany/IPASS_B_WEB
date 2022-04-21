import { Form } from 'antd'
import React, { FC } from 'react'

const Input: FC<{ type?: React.HTMLInputTypeAttribute; name: string; placeHolder?: string; icon?: React.ReactNode; onClickIcon?: () => void }> = ({
  type = 'text',
  name,
  placeHolder,
  icon,
  onClickIcon
}) => {
  return (
    <Form.Item name={name}>
      <div className="relative">
        <input
          type={type}
          className="custom_input border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-black focus:border-black"
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
