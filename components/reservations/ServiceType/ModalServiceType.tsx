import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import { IServiceType } from '@/types/interfaces/ServiceType/serviceType.interface'
import { HeartOutlined } from '@ant-design/icons'
import React from 'react'
import Button from '../../Button'

const ModalService = ({ service }: { service: IServiceType }) => {
  const { setSelectedServiceType, setStep } = useReservation()
  const onClick = (value: IServiceType) => {
    setSelectedServiceType(value)
    setStep(stepsPageReservation.services)
  }
  return (
    <div style={{ zIndex: '99999999' }}>
      <div className="Main_Modal_Service m-0 w-72">
        <div className="Photo_Modal h-52 flex justify-center content-center  aling-center w-full">
          <img src="/images/Peinado.png" className="sec-img aling-center h-52 flex  content-center justify-center"></img>
        </div>
        <div className="Question_Information w-full  mt-2 text-center text-xs">
          <p>
            {' '}
            <HeartOutlined style={{ fontSize: '20px' }} /> Agregar a favoritos
          </p>
        </div>
        <div className="Question_Information w-full font-helvetica mt-2 text-center divide-y divide-slate-200 font-bold text-base">
          <p> {service?.name}</p>
        </div>
        <div className="Information_Modal font-bold  w-full">
          <p> Descripción</p>
        </div>
        <div className="Information_Modal border h-10 p-2 w-full divide-y divide-slate-200">
          <p> Loream ...... </p>
        </div>
        <div className="Information_Modal font-bold mt-2 w-full divide-y divide-slate-200">
          <p> Quienes lo realizan:</p>
        </div>
        <div className="Information_Modal border p-2 h-10 w-full divide-y divide-slate-200">
          <p> Pedro, Juan ...... </p>
        </div>
        <div className="Information_Modal font-bold mt-2  w-full">
          <p> Servicios</p>
        </div>
        <div className="Information_Modal  h-10 p-2 w-full divide-y divide-slate-200">
          <p> Masaje</p>
          <p> Mascarilla Facial</p>
          <p> Piedras calientes</p>
        </div>

        <div className="Container_Comments  mt-10  w-full ">
          <Button title="Seleccionar" onClick={() => onClick(service)} customClassName="w-full"></Button>
        </div>
      </div>
    </div>
  )
}

export default ModalService
