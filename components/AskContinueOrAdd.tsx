import useCar from '@/providers/CarContext'
import { IService } from '@/types/interfaces/services/Services.interface'
import { Modal } from 'antd'
import React, { useState } from 'react'
import Button from './Button'
import CardResume from './CardResume'

const AskContinueOrAdd = ({
  visible,
  setVisible,
  onCancel,
  goStart,
  goHours
}: {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  onCancel: () => void
  goStart: () => void
  goHours: () => void
}) => {
  const { car } = useCar()
  const [confirm, setConfirm] = useState(false)
  // const price = (car?.services as IShoppingService[])?.map(e => (e.service as IService)?.price)?.reduce((a, b) => a + b)

  return (
    <>
      <Modal
        onCancel={onCancel}
        footer={[
          <div key={'footer'}>
            <div className=" text-left">
              <p>¿Desea agregar mas servicios,o ver horarios?</p>
            </div>
            <Button
              title="Proceder con reserva"
              onClick={() => {
                setVisible(false)
                setConfirm(true)
              }}
            />
            <Button title="Agregar mas servicios" onClick={goStart} />
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
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>{`Tiempo estimado:${car?.services
            .map(e => (e.service as IService).serviceTime)
            .reduce((a, b) => a + b)} min`}</div>
        </div>
      </Modal>
      <Modal
        onCancel={() => setConfirm(false)}
        footer={[
          <>
            <Button
              title="Si deseo continuar con mi reserva"
              onClick={() => {
                goHours()
                setConfirm(false)
              }}
            />
            <Button
              title="No, deseo agregar otro servicio"
              onClick={() => {
                setConfirm(false)
                goStart()
              }}
            />
          </>
        ]}
        title={'Estas seguro'}
        visible={confirm}
      >
        <p>Antes de continuar a calcular el tiempo de tu reserva,¿Deseas agregar otro servicio ? </p>
      </Modal>
    </>
  )
}

export default AskContinueOrAdd
