import { ICards } from '@/types/types'
import { CheckCircleOutlined, CreditCardOutlined } from '@ant-design/icons'
import React from 'react'
const CardTable = ({ cards = [] }: { cards: ICards[] }) => {
  return (
    <>
      <div className="title flex space-x-2 p-1">
        <CreditCardOutlined style={{ fontSize: '20px' }} />
        <p className=" text-left font-semibold text-base flex space-x-4">Tarjetas Registradas</p>
      </div>
      <div className="Info_T_Cards_preview flex w-full space-x-8 p-1 font-semibold ">
        <CheckCircleOutlined style={{ fontSize: '20px', color: '#1BB66E' }} />
        <div className="w-1/3">
          <p>Titular</p>
        </div>
        <div className="w-1/3">
          <p>N. tarjeta</p>
        </div>
        <div className="w-1/3">
          <p>F. Venci</p>
        </div>
      </div>

      {cards?.map((card, i) => (
        <div key={i} className="Info_Cards_preview flex space-x-12 p-1 font-bold font-semibold ">
          <CreditCardOutlined style={{ fontSize: '15px' }} />
          <p>{card.lastName1}</p>
          <p>{card.number.slice(-4)}</p>
          <p>{card.Expired}</p>
          <p>{}</p>
        </div>
      ))}
    </>
  )
}

export default CardTable
