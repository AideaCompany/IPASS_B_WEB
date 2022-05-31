import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import React from 'react'
import Button from '../Button'

const Genere = () => {
  const { setStep } = useReservation()
  const onClick = () => {
    setStep(stepsPageReservation.store)
  }

  return (
    <div className="Container_Genere  w-full ">
      <p className="Title font-Gothic text-right ">Mis reservas </p>
      <div className="Container_fluid w-full  flex space-x-4 mt-16 h-72">
        <div className="Container_Man w-1/3 " onClick={onClick}>
          <img src="/images/Caballeros.png" className="map-img"></img>
          <p className="Title font-Gothic text-right font-bold text-xl "> Hombres</p>
        </div>

        <div className="Container_women w-1/3 " onClick={onClick}>
          <img src="/images/Damas.png" className="map-img"></img>
          <p className="Title font-Gothic text-right font-bold text-xl "> Mujeres</p>
        </div>
        <div className="Container_children w-1/3" onClick={onClick}>
          <img src="/images/Niños.png" className="map-img"></img>
          <p className="Title font-Gothic text-right font-bold text-xl "> Niños</p>
        </div>
      </div>
    </div>
  )
}

export default Genere
