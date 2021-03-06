import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import { IServiceType } from '@/types/interfaces/ServiceType/serviceType.interface'
const CardServicesType = ({ service }: { service: IServiceType }) => {
  const { setSelectedServiceType, setStep } = useReservation()
  const onClick = (value: IServiceType) => {
    setSelectedServiceType(value)
    setStep(stepsPageReservation.services)
  }

  return (
    <div className="Container_Ser w-56  h-72 lg:max-w-full lg:flex cursor-pointer " onClick={() => onClick(service)}>
      <div className="card_blur"></div>
      <div className="Image_containerSec">
        {/* <div className="Image_background"></div> */}
        <img src={service.logo.key} className="sec-img w-full"></img>
      </div>
      <div className="flex flex-col items-center justify-center w-full text-white p-0  shadow rounded-lg">
        <h2 className="mt-4 font-bold text-xl text-white text-center w-full ">{service?.name}</h2>
        <p className="text-xs text-gray-500 text-center mt-48">{service.description}</p>
      </div>
    </div>
  )
}

export default CardServicesType
