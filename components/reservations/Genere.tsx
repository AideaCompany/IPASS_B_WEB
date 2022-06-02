import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import React, { useState } from 'react'

const Genere = () => {
  const [genere, setSelectGenere] = useState<string>('')
  const { setStep } = useReservation()
  const onClick = (paramGenere: string) => {
    setStep(stepsPageReservation.store)
    setSelectGenere(paramGenere)
  }

  return (
    <div className="Container_Genere  w-full ">
      <p className="Title font-Gothic text-right ">Mis reservas </p>
      <div className="Container_fluid w-full  flex space-x-4 mt-16 h-72 dark:md:hover:bg-fuchsia-600">
        <div className="Container_Men w-1/3 dark:md:hover:bg-fuchsia-600" onClick={() => onClick('men')}>
          <img src="/images/Caballeros.png" className="map-img hover:bg-sky-700 "></img>
          <p className="Title font-Gothic text-right font-bold text-xl dark:md:hover:bg-fuchsia-600"> Hombres</p>
        </div>

        <div className="Container_women w-1/3 " onClick={() => onClick('women')}>
          <img src="/images/Damas.png" className="map-img"></img>
          <p className="Title font-Gothic text-right font-bold text-xl "> Mujeres</p>
        </div>
        <div className="Container_children w-1/3" onClick={() => onClick('children')}>
          <img src="/images/Niños.png" className="map-img"></img>
          <p className="Title font-Gothic text-right font-bold text-xl "> Niños</p>
        </div>
      </div>
    </div>
  )
}

export default Genere
