import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import React from 'react'
import Button from '../Button'

const Select = () => {
  const { setStep } = useReservation()
  const onClick = () => {
    setStep(stepsPageReservation.staffers)
  }

  return (
    <div className="Container_select ">
      <p className="Title font-Gothic text-right ">Mis reservas </p>
      <div className="Container_fluid ">
        <div className="Container_F_Text " onClick={onClick}>
          <img src="/images/Profesional.png" className="map-img"></img>
          <p className="Title font-Gothic text-right font-bold text-xl "> Profesionales</p>
        </div>

        <div className="Container_F_Text " onClick={() => setStep(stepsPageReservation.services)}>
          <img src="/images/Servicios.png" className="map-img"></img>
          <p className="Title font-Gothic text-right font-bold text-xl "> Servicios</p>
        </div>
      </div>
      <div className="Container_reservation  ">
        <p className="Title font-Gothic text-right  font-bold border-b border-color-gray">Reserva màs reciente</p>
        <div className="container_buttons">
          <div className="line  divide-y divide-slate-200"></div>
          <div className="change  ">
            <Button title="Modificar " onClick={onClick} customClassName="button  text-xs" />
          </div>
          <div className="cancel ">
            <Button title="Cancelar" onClick={onClick} customClassName="button  text-xs" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Select
