import ModalService from '@/components/ModalService'
import { IService } from '@/types/interfaces/services/Services.interface'
import { Popover } from 'antd'
import React, { useState } from 'react'
const CardServices = ({ service }: { service: IService }) => {
  const [visible, setVisible] = useState(false)

  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible)
  }

  return (
    <Popover
      visible={visible}
      onVisibleChange={handleVisibleChange}
      content={<ModalService setVisible={setVisible} service={service}></ModalService>}
      placement="leftBottom"
      trigger="click"
    >
      <div className="Container_Ser w-56  h-72 lg:max-w-full lg:flex cursor-pointer ">
        <div className="Image_containerSec">
          {/* <div className="Image_background"></div> */}
          <img src={service.photo.key} className="sec-img w-full"></img>
        </div>
        <div className="flex flex-col items-center justify-center text-white p-0 shadow rounded-lg">
          <h2 className="mt-4 font-bold text-xl text-white  text-right">{service?.name}</h2>
          <p className="text-xs text-gray-500 text-center mt-48">Lorem ipsum dolor sit amet, consectetur adipisicing eli</p>
        </div>
      </div>
    </Popover>
  )
}

export default CardServices
