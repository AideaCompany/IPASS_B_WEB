import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import { ScissorOutlined, UserOutlined } from '@ant-design/icons'

import React from 'react'
import Button from '../Button'

const Select = () => {
  const { setStep } = useReservation()
  const onClick = () => {
    setStep(stepsPageReservation.staffers)
  }
  return (
    <div className="Container_select ">
      <div className="Image_container">
        {/* <div className="Image_background"></div> */}
        <img src="/images/fondo.png" className="map-img"></img>
      </div>

      <p className="Title font-Gothic text-right">Mis reservas </p>
      <div className="Container_fluid ">
        <div className="Container_F_Text ">
          <p className="Title font-Gothic text-right font-bold text-xl ">Reservar por </p>
        </div>
        <div className="Container_Tarjet divide-y divide-slate-100">
          <div className="Tarjet_Staffer ">
            <p className="Title font-Gothic text-right font-bold text-lg">Personal</p>
            <div className="Main_Staffer ">
              <div className="Staffer_icon " style={{ fontSize: '45px' }}>
                <p>
                  <UserOutlined />
                </p>
                z
              </div>
              <div className="Staffer_text ">
                <p className="Title font-Gothic text-right ">Selecciona tu staffer de preferencia</p>{' '}
              </div>
            </div>
          </div>
          <div className="Tarjet_Service " onClick={() => setStep(stepsPageReservation.services)}>
            <p className="Title font-Gothic text-right font-bold text-lg">Servicio</p>
            <div className="Main_Service">
              <div className="Service_icon " style={{ fontSize: '45px' }}>
                <p>
                  <ScissorOutlined />
                </p>
              </div>
              <div className="Service_text ">
                <p className="Title font-Gothic text-right "> Selecciona el servicio que deseas adquirir</p>{' '}
              </div>
            </div>
          </div>
        </div>
        <div className="Container_S_Text "></div>
      </div>
      <div className="Container_reservation ">
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
