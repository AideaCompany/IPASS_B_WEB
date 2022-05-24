import { Form } from 'antd'
import React, { useEffect, useState } from 'react'

export const MyToggle = ({ onChange, value }: { onChange: (value: boolean) => void; value: boolean }) => {
  const [myValue, setMyValue] = useState(value)
  useEffect(() => {
    if (!value) {
      onChange(false)
    }
  }, [])
  return (
    <>
      <div
        onClick={() => {
          setMyValue(!myValue)
          onChange(!myValue)
        }}
        className="relative inline-block w-10  mr-2 align-middle select-none  transition duration-200 ease-in"
      >
        <input
          type="checkbox"
          checked={myValue}
          onChange={() => {
            setMyValue(!myValue)
            onChange(!myValue)
          }}
          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        />
        <label className={`toggle-label block overflow-hidden h-6 rounded-full bg-black cursor-pointer`} />
      </div>
    </>
  )
}
const Toggle = ({ item }: { item: { label: string; name: string; required: boolean; type: string } }) => {
  return (
    <Form.Item name={item.name} style={{ margin: 0 }} rules={[{ required: item.required, message: `El campo es requerido` }]}>
      {
        //@ts-ignore
        <MyToggle />
      }
    </Form.Item>
  )
}

export default Toggle
