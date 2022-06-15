import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import { Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import React from 'react'
import Button from '../Button'

const Select = () => {
  const { setStep } = useReservation()
  const onClick = () => {
    setStep(stepsPageReservation.staffers)
  }
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`)
  }

  return (
    <div className="Container_select ">
      <p className="Title font-Gothic text-right ">Mis reservas </p>
      <div className="Container_fluid ">
        <div className="Container_F_Text relative" onClick={onClick}>
          <img src="/images/Profesional.png" className="mapS-img relative"></img>
          <p className=" font-Gothic font-bold text-2xl text-white absolute bottom-0 left-10 top-20"> Profesionales</p>
        </div>

        <div className="Container_F_Text relative" onClick={() => setStep(stepsPageReservation.services)}>
          <img src="/images/Servicios.png" className="mapS-img relative"></img>
          <p className="font-Gothic text-right font-bold text-2xl text-white absolute bottom-0 left-10 top-20"> Servicios</p>
        </div>
      </div>
      <div className="Sale font-Gothic text-left  font-bold pt-20 pl-4">
        <Checkbox onChange={onChange}>Si es tu primera reserva, obtén un 5% de descuento</Checkbox>{' '}
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
