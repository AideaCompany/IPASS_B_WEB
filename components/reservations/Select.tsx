import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'

const Select = ({}: {}) => {
  const { setStep, setSelected, selectedStore, genere } = useReservation()
  const onClick = (value: stepsPageReservation.services | stepsPageReservation.staffers) => {
    setSelected(value)
    setStep(value === stepsPageReservation.services ? stepsPageReservation.servicesType : stepsPageReservation.staffers)
  }

  return (
    <div className="Container_select mb-4 ">
      <div className="oli">
        <p className="title_resume font-Gothic text-center font-bold text-lg w-full mt-2  ">
          Seleccionaste el establecimiento: {selectedStore?.name} y el servicio sera para {genere}
        </p>
      </div>
      <div className="oli">
        <p className="title_question font-Gothic text-center font-bold text-lg w-full mt-1  "> ¿Cómo quieres hacer tu reserva?</p>
      </div>
      <div className="Container_fluid pt-4 mt-2 mb-4 flex  justify-center  ">
        <div className="Container_F relative justify-center mt-2 mb-2 " onClick={() => onClick(stepsPageReservation.services)}>
          <img src="/images/Servicios.png" className="mapF-img relative w-full pl-2"></img>
          <p className="font-Gothic text-center font-bold text-lg w-40 text-white   absolute bottom-0 left-12 top-20"> Por Servicios</p>
          <p className="font-Gothic text-center font-bold text-sm  w-40 text-white  absolute bottom-0 left-12 top-28">
            Busca y selecciona el servicio que necesitas.
          </p>
        </div>
      </div>
      <div className="Container_fluid pt-4 mt-2  flex justify-center ">
        <div className="Container_F  mt-2 mb-2" onClick={() => onClick(stepsPageReservation.staffers)}>
          <img src="/images/Profesional.png" className="mapF-img relative w-full pl-2"></img>
          <div className="Gradient"></div>
          <p className="font-Gothic text-center font-bold text-lg w-44 text-white   absolute bottom-0 left-10 top-20"> Por Profesional</p>
          <p className="font-Gothic text-center font-bold text-sm  w-44 text-white  absolute bottom-0 left-10 top-28">
            ¿Conoces alguno de nuestros profesionales?, buscalo acá.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Select
