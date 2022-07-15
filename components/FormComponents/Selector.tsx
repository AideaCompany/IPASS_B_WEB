import { Form, FormInstance } from 'antd'
import React, { FC, useEffect, useRef, useState } from 'react'

type valueSelector = {
  value: string
  label: string
  icon?: React.ReactNode
}

const Selector: FC<{
  required: boolean
  name: string
  placeHolder?: string
  values: valueSelector[]
  formRef: React.RefObject<FormInstance<any>>
}> = ({ name, placeHolder = '', values, formRef, required = false }) => {
  const MyCustomSelect = ({ onChange, value }: { onChange: (value: string) => void; value: string }) => {
    const [open, setOpen] = useState(false)
    const selectorRef = useRef(null)
    const [search, setSearch] = useState(value ? (values.find(e => e.value === value)?.label as string) : null)
    const calculateHeight = () => {
      const totals = values.filter(value => (search && search !== '' ? value.label.toLocaleLowerCase().includes(search.toLocaleLowerCase()) : true))
      switch (totals.length) {
        case 3:
          return 'h-30'
        case 2:
          return 'h-30'
        case 1:
          return 'h-10'
        case 0:
          return 'h-0'
        default:
          return 'h-40'
      }
    }
    // useEffect(() => {
    //   if (!value) {
    //     onChange('')
    //   }
    // }, [])

    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: MouseEvent) {
        //@ts-ignore
        if (selectorRef.current && !selectorRef.current.contains(event.target)) {
          setOpen(false)
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [selectorRef])
    return (
      <div ref={selectorRef} className="mb-1">
        <p className="font-Helvetica block mb-2 text-base font-normal text-black">{placeHolder}</p>
        <div className="h-10 bg-gray-50 border border-gray text-black flex border border-gray-200 items-center">
          <input
            onClick={() => setOpen(true)}
            value={search ?? ''}
            onChange={e => {
              onChange(e.target.value)
              setSearch(e.target.value)
            }}
            name="select"
            placeholder={placeHolder}
            className="px-4 appearance-none outline-none text-black w-full"
          />

          <button
            onClick={() => {
              onChange('')
              setSearch('')
            }}
            className="cursor-pointer outline-none focus:outline-none transition-all text-black hover:text-gray-600"
          >
            <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <label
            onClick={() => setOpen(!open)}
            className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-gray-600"
          >
            <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </label>
        </div>

        <div
          className={`mb-6 z-50 shadow text-black overflow-y-scroll  ${
            !open ? 'flex hidden' : ''
          } ${calculateHeight()} flex-col  mt-1 border border-gray-200`}
        >
          {values.length > 0 &&
            values
              .filter(value => (search && search !== '' ? value.label.toLocaleLowerCase().includes(search.toLocaleLowerCase()) : true))
              .map((value, i) => (
                <div
                  key={i}
                  onClick={() => {
                    formRef.current?.setFieldsValue({ [name]: value.value })
                    onChange(value.label)
                    setSearch(value.label)
                    setOpen(false)
                  }}
                  className="cursor-pointer group w-full	"
                >
                  <a className="block  p-2 border-transparent border-l-4 group-hover:border-gold group-hover:bg-gray-100 hover:text-gold">
                    <span className="pr-5">{value.icon}</span>
                    {value.label}
                  </a>
                </div>
              ))}
        </div>
      </div>
    )
  }

  return (
    <Form.Item style={{ margin: 0 }} name={name} rules={[{ required: required, message: `El campo es requerido` }]}>
      {
        //@ts-ignore
        <MyCustomSelect />
      }
    </Form.Item>
  )
}

export default Selector
