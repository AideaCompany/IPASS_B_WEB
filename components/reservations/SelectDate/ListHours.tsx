import { Modal } from 'antd'
import React, { useState } from 'react'
import CardHour from './CardHour'

const ListHours = ({
  title,
  hours,
  onClick,
  HourSelect,
  setHourSelect,
  hoursToShowModal
}: {
  title: string
  hours: string[]
  onClick: (value: string) => void
  HourSelect: string
  setHourSelect: React.Dispatch<React.SetStateAction<string>>
  hoursToShowModal: string[]
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = (value: string) => {
    setHourSelect(value)
    setIsModalVisible(true)
  }
  console.log(setHourSelect)

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <div className="Title_Hour">
        <p className="font-Butler font-medium text-lef text-xl">{title}</p>
      </div>
      {hours.length > 0 ? (
        <div className="box_Hour grid grid-cols-6 gap-4">
          {hours.map((e, i) => {
            return (
              <React.Fragment key={i}>
                <CardHour onClick={() => showModal(e)} hour={e} />
                <Modal title="Selecciona tu hora de reserva" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                  {hoursToShowModal.map((e, j) => (
                    <React.Fragment key={j}>
                      <CardHour onClick={() => onClick(e)} hour={e} />
                    </React.Fragment>
                  ))}
                </Modal>
              </React.Fragment>
            )
          })}
        </div>
      ) : (
        <p>No hay horarios disponibles</p>
      )}
    </>
  )
}

export default ListHours
