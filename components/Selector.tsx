import { Form, FormInstance } from 'antd'
import React, { FC, useEffect, useRef, useState } from 'react'

type valueSelector = {
  value: string
  label: string
  icon?: React.ReactNode
}

const Selector: FC<{ name: string; placeHolder?: string; values: valueSelector[]; formRef: React.RefObject<FormInstance<any>> }> = ({
  name,
  placeHolder = '',
  values,
  formRef
}) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const selectorRef = useRef(null)

  const calculateHeight = () => {
    const totals = values.filter(value => (search !== '' ? value.label.toLocaleLowerCase().includes(search.toLocaleLowerCase()) : true))
    switch (totals.length) {
      case 3:
        return 'h-40'
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
    <Form.Item name={name}>
      <div ref={selectorRef} className="relative">
        <div className="bg-black h-10 text-white bg-black flex border border-gray-200 items-center">
          <input
            onClick={() => setOpen(true)}
            value={search}
            onChange={e => setSearch(e.target.value)}
            name="select"
            placeholder={placeHolder}
            className="bg-black px-4 appearance-none outline-none text-gray-800 w-full"
          />

          <button
            onClick={() => setSearch('')}
            className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600"
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
          className={`absolute z-50 shadow bg-black text-white overflow-y-scroll   ${
            !open ? 'flex hidden' : ''
          } ${calculateHeight()} flex-col w-full mt-1 border border-gray-200`}
        >
          {values.length > 0 &&
            values
              .filter(value => (search !== '' ? value.label.toLocaleLowerCase().includes(search.toLocaleLowerCase()) : true))
              .map((value, i) => (
                <div
                  key={i}
                  onClick={() => {
                    formRef.current?.setFieldsValue({ [name]: value.value })
                    setSearch(value.label)
                    setOpen(false)
                  }}
                  className="cursor-pointer group"
                >
                  <a className="block text-white p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100 hover:text-gold">
                    <span className="pr-5">{value.icon}</span>
                    {value.label}
                  </a>
                </div>
              ))}
        </div>
      </div>
    </Form.Item>
  )
}

export default Selector
