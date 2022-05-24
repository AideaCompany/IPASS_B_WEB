import React from 'react'

const CardDay = ({ title, day, isSelected, onClick }: { title: string; day: string; isSelected: boolean; onClick: () => void }) => {
  return (
    <>
      {isSelected ? (
        <div className="cardDay bg-gold cursor-pointer">
          <p className="font-Helvetica text-white font-bold">{title}</p>
          <p className="font-Helvetica text-white font-bold">{day}</p>
        </div>
      ) : (
        <div className="cardDay cursor-pointer" onClick={onClick}>
          <p className="font-Helvetica text-black font-bold">{title}</p>
          <p className="font-Helvetica text-black font-bold">{day}</p>
        </div>
      )}
    </>
  )
}

export default CardDay
