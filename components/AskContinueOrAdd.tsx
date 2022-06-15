import useCar from '@/providers/CarContext'
import { IService } from '@/types/interfaces/services/Services.interface'
import { IShoppingService } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import { Modal } from 'antd'
import React from 'react'
import Button from './Button'
import CardResume from './CardResume'

const AskContinueOrAdd = ({
  visible,
  onCancel,
  goStart,
  goHours
}: {
  visible: boolean
  onCancel: () => void
  goStart: () => void
  goHours: () => void
}) => {
  const { car } = useCar()
  const price = (car?.services as IShoppingService[])?.map(e => (e.service as IService)?.price)?.reduce((a, b) => a + b)

  return (
    <Modal
      onCancel={onCancel}
      footer={[
        <div key={'footer'}>
          <div className=" text-left">
            <p>¿Desea agregar mas servicios,o ver horarios?</p>
          </div>
          <Button title="Ver horarios" onClick={goHours} />
          <Button title="Ver servicios" onClick={goStart} />
        </div>
      ]}
      visible={visible}
    >
      <div>
        <p>Resumen de reserva</p>
        <div className="Container_cardsB h-1/2 pt-4 ">
          {car?.services?.map((service, i) => (
            <React.Fragment key={i}>
              <CardResume service={service} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default AskContinueOrAdd
