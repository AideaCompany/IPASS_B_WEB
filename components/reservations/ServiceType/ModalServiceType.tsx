import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import { IServiceType } from '@/types/interfaces/ServiceType/serviceType.interface'
import React from 'react'
import Button from '../../Button'

const ModalService = ({ service }: { service: IServiceType }) => {
  const { setSelectedServiceType, setStep } = useReservation()
  const onClick = (value: IServiceType) => {
    setSelectedServiceType(value)
    setStep(stepsPageReservation.services)
  }
  return (
    <div>
      <div className="Main_Modal_Service m-0 flex w-96">
        <div className="Photo_Modal h-52 flex justify-center content-center  aling-center w-2/6">
          <img src="/images/Peinado.png" className="sec-img aling-center h-52 flex  content-center justify-center"></img>
        </div>
        <div className="Information_Modal h-52 w-2/4 ml-2 ">
          <div className="Question_Information w-full font-helvetica font-bold text-center text-xl">
            <p> {service?.name}</p>
          </div>
          <div className="Container_Information w-56 flex m-2 ">
            <div className="Question_Information w-1/2 font-helvetica  divide-y divide-gray-300  space-y-2 text-right">
              <p> Duración:</p>
              <p>Tipo de servicio:</p>
              <p>Profesionales:</p>
              <p>Precio:</p>
              <p>Descripción:</p>
            </div>
            <div className="Answer_Information h-52  w-1/2 pl-2 font-helvetica  mr-2 divide-y divide-gray-300  space-y-2 text-left">
              <p> 1h:20m</p>
              <p>Corte</p>
              <p>Pedro</p>

              <p>Q 200</p>
              <p>Tijera</p>
            </div>
          </div>
        </div>
        <div className="Container_Comments  mt-8 mb-1 w-2/6">
          <p>Comentarios</p>
          <input className="w-full border h-24"></input>
          <Button title="Seleccionar" onClick={() => onClick(service)} customClassName="w-full"></Button>
        </div>
      </div>
    </div>
  )
}

export default ModalService
