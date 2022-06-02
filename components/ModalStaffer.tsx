import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { fileType } from '@/types/typeTemplate'
import { Rate } from 'antd'
import React from 'react'
import Button from './Button'

const ModalStaffer = ({ staffer }: { staffer: IStaff }) => {
  const { setStep, setSelectedStaff } = useReservation()

  const onClick = (staff: IStaff) => {
    setSelectedStaff(staff)
    setStep(stepsPageReservation.servicesByStaffer)
  }
  return (
    <div>
      <div className="Main_Modal_Service m-0 w-72">
        <div className="Photo_Modal h-52 flex justify-center content-center  aling-center w-full">
          <img src={(staffer.photo as fileType).key} className="sec-img aling-center h-52 flex  content-center justify-center"></img>
        </div>
        <div className="Question_Information w-full font-helvetica mt-2 text-center divide-y divide-slate-200 font-bold text-base">
          <p> {staffer?.name}</p>
        </div>
        <div className="Information_Modal flex w-full divide-y divide-slate-200">
          <div className="Question_Information w-1/2 font-helvetica mt-2 text-left text-sm divide-y divide-slate-200">
            <p> Experiencia</p>
          </div>
          <div className="Container_Rate w-1/2 mt-2 text-right divide-y divide-slate-200">
            <p> 1250 horas</p>
          </div>
        </div>
        <div className="Information_Modal flex w-full divide-y divide-slate-200">
          <div className="Question_Information w-1/2 font-helvetica content-center pt-2  mt-2 text-left text-sm divide-y divide-slate-200">
            <p> Uñas</p>
          </div>
          <div className="Container_Rate w-1/2  mt-2 divide-y divide-slate-200">
            <Rate></Rate>
          </div>
        </div>
        <div className="Container_Comments  mt-8  w-full ">
          <p>Comentarios</p>
          <input className="w-full  h-16 mb-2"></input>
          <Button title="Seleccionar" onClick={() => onClick(staffer)} customClassName="w-full mt-10"></Button>
        </div>
      </div>
    </div>
  )
}
export default ModalStaffer
