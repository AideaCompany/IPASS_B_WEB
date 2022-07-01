import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'

const Select = () => {
  const { setStep, setSelected } = useReservation()
  const onClick = (value: stepsPageReservation.services | stepsPageReservation.staffers) => {
    setSelected(value)
    setStep(value === stepsPageReservation.services ? stepsPageReservation.servicesType : stepsPageReservation.staffers)
  }

  return (
    <div className="Container_select ">
      <p className="Title font-Gothic text-right pt-4 ">Selección de tipo</p>
      <div className="Container_fluid pt-4 flex justify-center  ">
        <div className="Container_F  mt-4 " onClick={() => onClick(stepsPageReservation.staffers)}>
          <img src="/images/Profesional.png" className="mapF-img relative w-11/12 pl-2"></img>
          <div className="Gradient"></div>
          <p className="TitleB font-Gothic font-bold text-2xl text-white absolute bottom-0 left-10 top-20"> Profesionales</p>
        </div>
      </div>
      <div className="Container_fluid pt-4 mt-8 flex justify-center ">
        <div className="Container_F relative " onClick={() => onClick(stepsPageReservation.services)}>
          <img src="/images/Servicios.png" className="mapF-img relative w-11/12 pl-2"></img>
          <p className="font-Gothic text-right font-bold text-2xl text-white absolute bottom-0 left-10 top-20"> Servicios</p>
        </div>
      </div>
    </div>
  )
}

export default Select
