import useCar from '@/providers/CarContext'
import useReservation from '@/providers/ReservationContext'
import { listServiceByStaffAndStoreFn } from '@/services/services'
import { IService } from '@/types/interfaces/services/Services.interface'
import React, { useEffect, useState } from 'react'
import CardServices from './Service/CardServices'

const ServicesByStaff = () => {
  const { car } = useCar()
  const { selectedStore, selectedStaff } = useReservation()

  const [services, setServices] = useState<IService[]>([])

  useEffect(() => {
    getData()
  }, [car])

  const getData = async () => {
    const data = await listServiceByStaffAndStoreFn(selectedStore?._id as string, selectedStaff?._id as string)
    setServices(data)
  }

  return (
    <div className="Main_Container">
      <div className="Container_bar ">
        {/* <div className="Search_bar flex appearance-none   left-2 m-5 sm:max-w-screen-sm text-stone-900">
          <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
          </svg>
          <input type="text" className="appearance-none bg-transparent px-4 py-2 w-64" placeholder="Buscar peinado"></input>
        </div>

        <div className="Search_list flex appearance-none border-b  left-2 m-5 sm:max-w-screen-sm text-stone-900">
          <input type="text" className="appearance-none bg-transparent px-4 py-2 w-64" placeholder="Seleccionar tipo de servicio"></input>
          <CaretDownOutlined />
        </div> */}
        {/* <div className="Main_tittle ">
          <p className="Title font-Gothic text-right "> Servicios</p>
        </div> */}
      </div>
      <div className="Container_personal  grid grid-cols-3 gap-x-8 gap-y-2 mt-4">
        {services.map((service, i) => (
          <React.Fragment key={i}>
            <CardServices service={service} />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default ServicesByStaff
