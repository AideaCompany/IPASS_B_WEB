import ModalStaffer from '@/components/ModalStaffer'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { fileType } from '@/types/typeTemplate'
import { Popover } from 'antd'
import React from 'react'
const CardStaffers = ({ staffer }: { staffer: IStaff }) => {
  return (
    <>
      <Popover content={<ModalStaffer staffer={staffer} />} placement="leftTop" trigger="click">
        <div className="Container_Ser w-56  h-72 lg:max-w-full lg:flex cursor-pointer ">
          <div className="card_blur"></div>
          <div className="Image_containerSec ">
            {/* <div className="Image_background"></div> */}
            <img src={(staffer.photo as fileType).key} className="sec-img"></img>
          </div>
          <div className="flex flex-col items-center justify-center text-white p-0n">
            <h2 className="mt-4 font-bold text-xl text-white text-right">{staffer?.name}</h2>

            <p className="text-xs text-gray-500 text-center mt-48">Lorem ipsum dolor sit amet, consectetur adipisicing eli</p>
          </div>
        </div>
      </Popover>
    </>
  )
}

export default CardStaffers
