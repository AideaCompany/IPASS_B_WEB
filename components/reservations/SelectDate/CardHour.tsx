import { availableHours } from '@/types/interfaces/services/Services.interface'
import { ILocation } from '@/types/types'
import { FormInstance } from 'antd'
import React, { useCallback, useRef, useState } from 'react'

const CardHour = ({ onClick, hour }: { onClick: () => void; hour: availableHours }) => {
  const formRef = useRef<FormInstance<ILocation>>(null)
  const [current, setCurrent] = useState(0)
  const [data, setData] = useState<ILocation>()
  //#region functions
  const HandleChangeCurrent = useCallback(
    (type: 'next' | 'back') => {
      const currentData = formRef.current?.getFieldsValue() as ILocation
      setData(currentVal => ({ ...currentVal, ...currentData }))
      if (type === 'next') {
        setCurrent(current + 1)
      } else {
        setCurrent(current - 1)
      }
    },
    [current]
  )
  const formatHour = (value: string) => {
    const minutes = parseInt(value.split(':')[1])
    if (minutes < 10) {
      return `${value.split(':')[0]}:0${minutes}`
    }
    return value
  }
  return (
    <p
      className="hover:underline  hover:bg-gold hover:text-white font-Butler cursor-pointer border font-medium text-center font-bond text-lg"
      onClick={onClick}
    >
      {formatHour(hour.hour)}
    </p>
  )
}

export default CardHour
