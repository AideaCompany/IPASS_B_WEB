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
      <p className="Title font-Gothic text-center text-sm font-bold mt-8 border">Selecciona el tipo de servicio </p>

      <div className="Container_Tar w-full grid grid-cols-2 gap-x-6 gap-y-6 mt-16 h-auto  p-10 ">
        <div className="Container_GEN  cursor-pointer  relative  justify-self-center border" onClick={() => onClick(generes.MEN)}>
          <img src="/images/Caballeros.png" className="mapG-img  relative  "></img>
          <div className="Gradient"></div>

          <p className="Title font-Gothic  font-bold text-2xl text-white absolute bottom-0 left-26 top-24 "> Caballeros</p>
        </div>
        <div className="Container_GEN    cursor-pointer relative justify-self-center " onClick={() => onClick(generes.WOMEN)}>
          <img src="/images/Damas.png" className="mapG-img h-60 relative"></img>
          <p className="Title font-Gothic text-right font-bold text-2xl text-white absolute bottom-0 left-26 top-24"> Damas</p>
        </div>
        <div className="Container_GEN   cursor-pointer relative justify-self-center" onClick={() => onClick(generes.WOMEN)}>
          <img src="/images/Niños.png" className="mapG-img h-60 relative"></img>
          <p className="Title font-Gothic text-right font-bold text-2xl text-white absolute bottom-0 left-26 top-24 "> Niños y Niñas</p>
        </div>
        <div className="Container_GEN   cursor-pointer relative justify-self-center" onClick={() => onClick(generes.ALL)}>
          <img src="/images/Todos.png" className="mapG-img h-60 relative"></img>
          <p className="Title font-Gothic text-right font-bold text-2xl text-white absolute bottom-0 left-26 top-24"> Todos</p>
        </div>
      </div>
    </div>
  )
}

export default Genere
