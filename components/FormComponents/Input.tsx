import { Form } from 'antd'
import { useState } from 'react'

const Input = ({ item }: { item: { label: string; name: string; required: boolean; type: string } }) => {
  const MyInput = ({ onChange, value }: { onChange: (value: string) => void; value: string }) => {
    const [myValue, setMyValue] = useState(value)
    // useEffect(() => {
    //   if (!value) {
    //     onChange('')
    //   }
    // }, [])

    return (
      <>
        <div className="mb-1">
          <label className="font-Gothic block flex items-center	bg-white mb-2 text-base font-normal text-black">
            {`${item.label} `}
            &nbsp;
            <p style={{ color: 'gray' }} className="font-Helvetica text-xs">{`${item.required ? '' : '(Opcional)'}`}</p>
          </label>
          <input
            type={'text'}
            value={myValue}
            onChange={e => {
              setMyValue(e.target.value)
              onChange(e.target.value)
            }}
            className="bg-gray-50 border border-gray-200 text-gray-900 text-md rounded-sm focus:ring-gold focus:border-gold block w-full p-2.5"
            placeholder={item.label}
          />
        </div>
      </>
    )
  }

  return (
    <Form.Item style={{ margin: 0 }} name={item.name} rules={[{ required: item.required, message: `El campo es requerido` }]}>
      {
        //@ts-ignore
        <MyInput />
      }
    </Form.Item>
  )
}

export default Input
