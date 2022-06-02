import ModalService from '@/components/ModalService'
import useCar from '@/providers/CarContext'
import useReservation from '@/providers/ReservationContext'
import { listServiceByStoreFn } from '@/services/services'
import { IService } from '@/types/interfaces/services/Services.interface'
import { CaretDownOutlined } from '@ant-design/icons'
import { Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import CardServices from './CardServices'

const Services = () => {
  const { car } = useCar()
  const { selectedStore, setSelectedService, setVisibleAsk } = useReservation()
  const onClick = (value: IService) => {
    setSelectedService(value)
    setVisibleAsk(true)
  }
  const [services, setServices] = useState<IService[]>([])

  useEffect(() => {
    getData()
  }, [car])

  const getData = async () => {
    setServices(
      (await listServiceByStoreFn(selectedStore?._id as string)).filter(e => !car?.services.map(l => (l.service as IService)._id).includes(e._id))
    )
  }
  const content = <ModalService></ModalService>

  return (
    <div className="Main_Container">
      <div className="Container_bar ">
        <div className="Search_bar flex appearance-none   left-2 m-5 sm:max-w-screen-sm text-stone-900">
          <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
          </svg>
          <input type="text" className="appearance-none bg-transparent px-4 py-2 w-64" placeholder="Buscar peinado"></input>
        </div>

        <div className="Search_list flex appearance-none border-b  left-2 m-5 sm:max-w-screen-sm text-stone-900">
          <input type="text" className="appearance-none bg-transparent px-4 py-2 w-64" placeholder="Seleccionar tipo de servicio"></input>
          <CaretDownOutlined />
        </div>
        <div className="Main_tittle ">
          <Popover content={content} placement="leftBottom" trigger="click">
            <p className="Title font-Gothic text-right "> Servicios</p>{' '}
          </Popover>
        </div>
      </div>
      <div className="Container_personal  grid grid-cols-3 gap-x-8 gap-y-0">
        {services.map((service, i) => (
          <React.Fragment key={i}>
            <CardServices service={service} onClick={() => onClick(service)} />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Services
