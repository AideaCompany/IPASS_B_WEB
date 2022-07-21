import { formatHour } from '@/utils/utils'
import React from 'react'

const CardHour = ({ onClick, hour }: { onClick: () => void; hour: string }) => {
  //#region functions

  return (
    <p
      className="text_hour hover:underline  hover:bg-gold hover:text-white font-Butler cursor-pointer border font-medium text-center font-bond text-lg"
      onClick={onClick}
    >
      {formatHour(hour)}
    </p>
  )
}

export default CardHour
