import { availableHours } from '@/types/interfaces/services/Services.interface'
import React from 'react'
import CardHour from './CardHour'

const ListHours = ({ title, hours, onClick }: { title: string; hours: availableHours[][]; onClick: (value: availableHours[]) => void }) => {
  return (
    <>
      <div className="Title_Hour">
        <p className="font-Butler font-medium text-lef text-xl">{title}</p>
      </div>
      {hours.length > 0 ? (
        <div className="box_Hour grid grid-cols-6 gap-4">
          {hours.map((e, i) => (
            <React.Fragment key={i}>
              <CardHour onClick={() => onClick(e)} hour={e[0]} />
            </React.Fragment>
          ))}
        </div>
      ) : (
        <p>No hay horarios disponibles</p>
      )}
    </>
  )
}

export default ListHours
