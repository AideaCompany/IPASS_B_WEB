import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import { IShoppingCard } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import { Checkbox } from 'antd'

const Select = ({ history }: { history: IShoppingCard | null }) => {
  const firstService = history?.services[0]
  const { setStep } = useReservation()
  const onClick = () => {
    setStep(stepsPageReservation.staffers)
  }

  return (
    <div className="Container_select ">
      <p className="Title font-Gothic text-right pt-4 ">Selección de tipo</p>
      <div className="Container_fluid pt-4 flex justify-center  ">
        <div className="Container_F  mt-4 " onClick={onClick}>
          <img src="/images/Profesional.png" className="mapF-img relative w-11/12 pl-2"></img>
          <div className="Gradient"></div>
          <p className="TitleB font-Gothic font-bold text-2xl text-white absolute bottom-0 left-10 top-20"> Profesionales</p>
        </div>
      </div>
      <div className="Container_fluid pt-4 mt-8 flex justify-center ">
        <div className="Container_F relative " onClick={() => setStep(stepsPageReservation.servicesType)}>
          <img src="/images/Servicios.png" className="mapF-img relative w-11/12 pl-2"></img>
          <p className="font-Gothic text-right font-bold text-2xl text-white absolute bottom-0 left-10 top-20"> Servicios</p>
        </div>
      </div>
    </div>
  )
}

export default Select
