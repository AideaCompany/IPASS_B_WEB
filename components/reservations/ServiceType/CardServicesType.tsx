import { IServiceType } from '@/types/interfaces/ServiceType/serviceType.interface'
import { Popover } from 'antd'
import React from 'react'
import ModalServiceType from './ModalServiceType'
const CardServicesType = ({ service }: { service: IServiceType }) => {
  console.log(service.logo.key)
  return (
    <Popover content={<ModalServiceType service={service} />} placement="leftBottom" trigger="click">
      <div className="Container_Ser w-56  h-72 lg:max-w-full lg:flex cursor-pointer ">
        <div className="Image_containerSec">
          {/* <div className="Image_background"></div> */}
          <img src={service.logo.key} className="sec-img"></img>
        </div>
        <div className="flex flex-col items-center justify-center text-white p-0n  shadow rounded-lg">
          <h2 className="mt-4 font-bold text-xl text-white text-right">{service?.name}</h2>

          <p className="text-xs text-gray-500 text-center mt-48">Lorem ipsum dolor sit amet, consectetur adipisicing eli</p>
        </div>
      </div>
    </Popover>
  )
}

export default CardServicesType