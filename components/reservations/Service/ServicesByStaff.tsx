import useCar from '@/providers/CarContext'
import useReservation from '@/providers/ReservationContext'
import { listServiceByStaffAndStoreFn } from '@/services/services'
import { IService } from '@/types/interfaces/services/Services.interface'
import { useEffect, useState } from 'react'
import ServiceComponent from './ServiceComponent'

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

  return <ServiceComponent services={services} />
}

export default ServicesByStaff
