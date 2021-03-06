import useCar from '@/providers/CarContext'
import useReservation from '@/providers/ReservationContext'
import { listServiceByStoreAndTypeFn } from '@/services/services'
import { IService } from '@/types/interfaces/services/Services.interface'
import { useEffect, useState } from 'react'
import ServiceComponent from './ServiceComponent'

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

  return <ServiceComponent services={services} />
}

export default Services
