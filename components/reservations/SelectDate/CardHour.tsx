import { availableHours } from '@/types/interfaces/services/Services.interface'
import React from 'react'

const CardHour = ({ onClick, hour }: { onClick: () => void; hour: availableHours | string }) => {
  //#region functions

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
      {(hour as availableHours)?.hour ? formatHour((hour as availableHours).hour) : formatHour(hour as string)}
    </p>
  )
}

export default CardHour
