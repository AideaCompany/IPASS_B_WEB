import { ILocation } from '@/types/types'
import { FormInstance, Steps } from 'antd'
import React, { useCallback, useRef, useState } from 'react'
import Hair from '../Hair'

const CardHour = ({ onClick }: { onClick: () => void }) => {
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
  return (
    <div className="Container_Main_H border ">
      <div className="Container_Times ">
        <div className="Title_Hour ">
          <p className="font-Butler font-medium text-lef text-xl">Mañana</p>
        </div>
        <div className="box_Hour grid grid-cols-6 gap-4">
          <p className="font-Butler border font-medium text-center font-bond text-lg" onClick={onClick}>
            8:00 am{' '}
          </p>
          <p className="font-Butler  border  font-medium text-center text-lg">8:10 am</p>
          <p className="font-Butler font-medium border text-center text-lg">8:20 am</p>
          <p className="font-Butler font-medium border text-center text-lg">8:30 am</p>
          <p className="font-Butler font-medium border  text-center text-lg">8:40 am</p>
          <p className="font-Butler font-medium border text-center text-lg">8:50 am</p>
          <p className="font-Butler font-medium border text-center text-lg">9:00 am</p>
          <p className="font-Butler font-medium border text-center text-lg">9:10 am</p>
          <p className="font-Butler font-medium border text-center text-lg">9:20 am</p>
          <p className="font-Butler font-medium border text-center text-lg">9:30 am</p>
          <p className="font-Butler font-medium border text-center text-lg">9:40 am</p>
          <p className="font-Butler font-medium border text-center text-lg">9:50 am</p>
          <p className="font-Butler font-medium border text-center text-lg">10:00 am</p>
          <p className="font-Butler font-medium border text-center text-lg">10:10 am</p>
        </div>
        <div className="Title_Hour ">
          <p className="font-Butler font-medium text-lef text-xl">Tarde</p>
        </div>
        <div className="box_Hour grid grid-cols-6 gap-4">
          <p className="font-Butler border font-medium text-center font-bond text-lg">12:00 pm</p>
          <p className="font-Butler  border  font-medium text-center text-lg">12:10 pm</p>
          <p className="font-Butler font-medium border text-center text-lg">12:20 pm</p>
          <p className="font-Butler font-medium border text-center text-lg">12:30 pm</p>
          <p className="font-Butler font-medium border  text-center text-lg">12:40 pm</p>
          <p className="font-Butler font-medium border text-center text-lg">12:50 pm</p>
          <p className="font-Butler font-medium border text-center text-lg">1:00 pm</p>
        </div>
      </div>
    </div>
  )
}

export default CardHour
