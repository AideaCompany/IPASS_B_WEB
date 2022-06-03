import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import { IService } from '@/types/interfaces/services/Services.interface'
import React from 'react'
import Button from './Button'

const ModalService = ({ service }: { service: IService }) => {
  const { setSelectedService, setVisibleAsk } = useReservation()
  const onClick = (value: IService) => {
    setSelectedService(value)
    setVisibleAsk(true)
  }
  return (
    <div>
      <div className="Main_Modal_Service m-0 w-72">
        <div className="Photo_Modal h-52 flex justify-center content-center  aling-center w-full">
          <img src="/images/Peinado.png" className="sec-img aling-center h-52 flex  content-center justify-center"></img>
        </div>
        <div className="Question_Information w-full font-helvetica mt-2 text-center divide-y divide-slate-200 font-bold text-base">
          <p> {service?.name}</p>
        </div>
        <div className="Information_Modal flex w-full">
          <div className="Question_Information w-1/2 font-bold font-helvetica mt-2 text-left text-sm ">
            <p> Tiempo de duración</p>
          </div>
          <div className="Container_Rate w-1/2 mt-2 text-right ">
            <p> 1250 horas</p>
          </div>
        </div>
        <div className="Information_Modal flex w-full">
          <div className="Question_Information font-bold w-1/2 font-helvetica content-center pt-2  mt-2 text-left text-sm divide-y divide-slate-200">
            <p> Tipo de servicio</p>
          </div>
          <div className="Container_Rate w-1/2  mt-2 divide-y mt-4 text-right divide-slate-200">Peinado</div>
        </div>
        <div className="Information_Modal flex w-full ">
          <div className="Question_Information font-bold w-1/2 font-helvetica content-center pt-2  mt-2 text-left text-sm divide-y divide-slate-200">
            <p> Precio</p>
          </div>
          <div className="Container_Rate w-1/2  mt-4 divide-y text-right divide-slate-200">Q 200</div>
        </div>
        <div className="Information_Modal font-bold  w-full">
          <p> Descripción</p>
        </div>
        <div className="Information_Modal border h-10 p-2 w-full divide-y divide-slate-200">
          <p> Loream ...... </p>
        </div>
        <div className="Information_Modal font-bold w-full divide-y divide-slate-200">
          <p> Quienes lo realizan:</p>
        </div>
        <div className="Information_Modal border p-2 h-10 w-full divide-y divide-slate-200">
          <p> Pedro, Juan ...... </p>
        </div>

        <div className="Container_Comments  mt-8  w-full ">
          <Button title="Seleccionar" onClick={() => onClick(service)} customClassName="w-full"></Button>
        </div>
      </div>
    </div>
  )
}

export default ModalService
