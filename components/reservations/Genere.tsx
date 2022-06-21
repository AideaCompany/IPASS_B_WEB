import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import { generes } from '@/types/interfaces/Stores/stores.interface'
import React from 'react'

const Genere = () => {
  const { setStep, setGenere } = useReservation()
  const onClick = (paramGenere: string) => {
    setStep(stepsPageReservation.store)
    setGenere(paramGenere)
  }

  return (
    <div className="Container_Genere  w-full pt-4">
      <p className="Title font-Gothic text-center text-sm font-bold mt-8 ">Selecciona el tipo de servicio </p>

      <div className="Container_flui w-full  flex space-x-4 mt-8 h-60 d-flex pl-16 ">
        <div className="Container_Men w-1/2   cursor-pointer h-60 relative d-flex" onClick={() => onClick(generes.MEN)}>
          <img src="/images/Caballeros.png" className="mapMen-img h-60 relative"></img>

          <div className="mask" style={{ backgroundColor: 'black' }}></div>
          <p className="Title font-Gothic text-right font-bold text-2xl text-white absolute bottom-0 left-32 top-24"> Caballeros</p>
        </div>
        <div className="Container_women w-1/2 cursor-pointer  pl-24 relative " onClick={() => onClick(generes.WOMEN)}>
          <img src="/images/Damas.png" className="map-img h-60 relative"></img>
          <p className="Title font-Gothic text-right font-bold text-2xl text-white absolute bottom-0 left-32 top-24 "> Damas</p>
        </div>
      </div>
      <div className="Container_fluid w-full  flex space-x-4 mt-16 h-72 ">
        <div className="Container_women w-1/2 pl-16 cursor-pointer relative " onClick={() => onClick(generes.WOMEN)}>
          <img src="/images/Niños.png" className="map-img h-60 relative"></img>
          <p className="Title font-Gothic text-right font-bold text-2xl text-white absolute bottom-0 left-32 top-24 "> Niños y Niñas</p>
        </div>
        <div className="Container_children w-1/2 cursor-pointer  pl-32 relative" onClick={() => onClick(generes.CHILDREN)}>
          <img src="/images/Todos.png" className="map-img h-60 relative"></img>
          <p className="Title font-Gothic text-right font-bold text-2xl text-white absolute bottom-0 left-32 top-24"> Todos</p>
        </div>
      </div>
    </div>
  )
}

export default Genere
