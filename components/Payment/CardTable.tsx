import useAuth from '@/providers/AuthContext'
import { deleteCardFn } from '@/services/clients'
import { ICards } from '@/types/types'
import { encryptValues } from '@/utils/utils'
import { CheckCircleOutlined, CreditCardOutlined, DeleteOutlined } from '@ant-design/icons'
import { message } from 'antd'
import React from 'react'
const CardTable = ({ cards = [], onComplete }: { cards: ICards[]; onComplete: () => Promise<void> }) => {
  const { user } = useAuth()
  const deleteCard = async (card: object) => {
    await deleteCardFn(user?._id as string, encryptValues(card))
    await onComplete()
    message.success('Tarjeta eliminada con éxito')
  }
  return (
    <>
      <div className="title flex space-x-2 p-1">
        <CreditCardOutlined style={{ fontSize: '20px' }} />
        <p className=" text-left font-semibold text-base flex space-x-4">Tarjetas Registradas</p>
      </div>
      <div className="Info_T_Cards_preview flex space-x-8 p-1 font-semibold ">
        <CheckCircleOutlined style={{ fontSize: '20px', color: '#1BB66E' }} />
        <p>Titular</p>
        <p># Tarjeta</p>
        <p>Fecha exp</p>
        <p>Acciones</p>
      </div>

      {cards?.map((card, i) => (
        <div key={i} className="Info_Cards_preview flex space-x-12 p-1 font-bold font-semibold ">
          <CreditCardOutlined style={{ fontSize: '15px' }} />
          <p>{card.lastName1}</p>
          <p>{card.number.slice(-4)}</p>
          <p>{card.Expired}</p>
          <span onClick={e => deleteCard(card)}>
            <DeleteOutlined style={{ color: 'tomato', cursor: 'pointer' }} />
          </span>
        </div>
      ))}
    </>
  )
}

export default CardTable
