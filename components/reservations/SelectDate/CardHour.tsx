import React from 'react'

const CardHour = ({ onClick, hour }: { onClick: () => void; hour: string }) => {
  //#region functions

  const formatHour = (value: string) => {
    if (value.search(':') === -1) {
      if (parseInt(value) < 10) {
        value = `0${value}`
      }
      value = `${value}:00`
    } else {
      if (parseInt(value.split(':')[0]) < 10) {
        value = `0${value.split(':')[0]}:${value.split(':')[1] === '0' ? `00` : value.split(':')[1]}`
      }
    }
    return value
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
