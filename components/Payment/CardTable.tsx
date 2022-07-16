import useAuth from '@/providers/AuthContext'
import { deleteCardFn } from '@/services/clients'
import { ICards } from '@/types/types'
import { encryptValues } from '@/utils/utils'
import { CheckCircleOutlined, CreditCardOutlined, DeleteOutlined } from '@ant-design/icons'
import { message } from 'antd'
import React from 'react'
const CardTable = ({
  cards = [],
  onComplete,
  setSelectedCard,
  selectedCard
}: {
  cards: ICards[]
  onComplete: () => Promise<void>
  setSelectedCard: React.Dispatch<React.SetStateAction<ICards | null>>
  selectedCard: ICards | null
}) => {
  const { user } = useAuth()
  const deleteCard = async (card: object) => {
    await deleteCardFn(user?._id as string, encryptValues(card))
    await onComplete()
    setSelectedCard(null)
    message.success('Tarjeta eliminada con éxito')
  }

  return (
    <>
      <div className="title flex space-x-2 p-1">
        <CreditCardOutlined style={{ fontSize: '20px' }} />
        <p className=" text-left font-semibold text-base flex space-x-4">Tarjetas Registradas</p>
      </div>
      <div className="Info_T_Cards_preview flex w-full text-center space-x-8 p-1 font-semibold ">
        <CheckCircleOutlined style={{ fontSize: '20px', color: '#1BB66E' }} />
        <div className="w-1/4">
          <p>Titular</p>
        </div>
        <div className="w-1/4">
          <p>N. tarjeta</p>
        </div>
        <div className="w-1/4">
          <p>F. Venci</p>
        </div>
        <div className="w-1/4">
          <p>Opciones</p>
        </div>
      </div>

      {cards?.map((card, i) => (
        <div
          key={i}
          onClick={() => setSelectedCard(card)}
          className="Info_T_Cards_preview 	cursor-pointer flex w-full text-center space-x-8 p-1 font-semibold "
        >
          {card.ID === selectedCard?.ID ? (
            <CheckCircleOutlined style={{ fontSize: '15px', color: '#1BB66E' }} />
          ) : (
            <CheckCircleOutlined style={{ fontSize: '15px', color: '#5b5b5b' }} />
          )}
          <div className="w-1/4">
            <p>{card.lastName1}</p>
          </div>
          <div className="w-1/4">
            <p>{card.number?.slice(-4)}</p>
          </div>
          <div className="w-1/4">
            <p>{card.Expired}</p>
          </div>
          <div className="w-1/4">
            <span onClick={e => deleteCard(card)}>
              <DeleteOutlined style={{ color: 'tomato', cursor: 'pointer' }} />
            </span>
          </div>
        </div>
      ))}
    </>
  )
}

export default React.memo(CardTable)
