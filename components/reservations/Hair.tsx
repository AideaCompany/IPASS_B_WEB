import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import { CaretDownOutlined } from '@ant-design/icons'
import React from 'react'
import CardHair from './CardHair'

const Hair = () => {
  const { setStep } = useReservation()
  const onClick = () => {
    setStep(stepsPageReservation.Type)
  }
  return (
    <div className="Main_Container">
      <div className="Container_bar ">
        <div className="Search_bar flex appearance-none   left-2 m-5 sm:max-w-screen-sm text-stone-900">
          <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
          </svg>
          <input type="text" className="appearance-none bg-transparent px-4 py-2 w-64" placeholder="Buscar peinado"></input>
        </div>

        <div className="Search_list flex appearance-none border-b  left-2 m-5 sm:max-w-screen-sm text-stone-900">
          <input type="text" className="appearance-none bg-transparent px-4 py-2 w-64" placeholder="Seleccionar tipo de servicio"></input>
          <CaretDownOutlined />
        </div>
        <div className="Main_tittle ">
          <p className="Title font-Gothic text-right "> Servicios</p>{' '}
        </div>
      </div>
      <div className="Container_Resume  w-full h-14 pt-0 px-64 content-center">
        <div className="Search_resume  flex appearance-none border-b w-52 left-2 m-5 content-center sm:max-w-screen-sm text-stone-900">
          <input
            type="text"
            className="appearance-none bg-transparent content-center px-4 py-0 w-56 font-Gothic text-right  text-xs"
            placeholder="Ver Resumen de la reserva"
          ></input>
          <CaretDownOutlined />
        </div>
      </div>
      <div className="Container_personal  grid grid-cols-3 gap-x-8 gap-y-0">
        {' '}
        <CardHair onClick={onClick} />
      </div>
    </div>
  )
}

export default Hair
