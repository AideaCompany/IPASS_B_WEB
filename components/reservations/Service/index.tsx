import useCar from '@/providers/CarContext'
import useReservation from '@/providers/ReservationContext'
import { listServiceByStoreAndTypeFn } from '@/services/services'
import { IService } from '@/types/interfaces/services/Services.interface'
import React, { useEffect, useState } from 'react'
import CardServices from './CardServices'

const Services = () => {
  const { car } = useCar()
  const { selectedStore, selectedServiceType } = useReservation()

  const [services, setServices] = useState<IService[]>([])

  useEffect(() => {
    getData()
  }, [car])

  const getData = async () => {
    setServices(
      (await listServiceByStoreAndTypeFn(selectedStore?._id as string, selectedServiceType?._id as string)).filter(
        e => !car?.services.map(l => (l.service as IService)._id).includes(e._id)
      )
    )
  }

  return (
    <div className="Main_Container">
      <div className="Container_personal p-8 grid h-auto grid-cols-4 gap-x-6  gap-y-8">
        {services.map((service, i) => (
          <React.Fragment key={i}>
            <CardServices service={service} />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Services
