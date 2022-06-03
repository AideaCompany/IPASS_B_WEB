import { Modal } from 'antd'
import React from 'react'

const CardHour = ({ onClick, hour }: { onClick: () => void; hour: string }) => {
  //#region functions

  const formatHour = (value: string) => {
    const format = ':00'
    const format2 = '0'
    let Result2
    if (parseInt(value) < 10) {
      Result2 = format2.concat(value)
    } else {
      Result2 = value
    }
    const HourFormat = Result2.concat(format)

    console.log(HourFormat)
    return HourFormat
  }

  return (
    <p
      className="hover:underline  hover:bg-gold hover:text-white font-Butler cursor-pointer border font-medium text-center font-bond text-lg"
      onClick={onClick}
    >
      {formatHour(hour)}
    </p>
  )
}

export default CardHour
