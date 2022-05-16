import { IService } from '@/types/interfaces/services/Services.interface'
import React from 'react'
const CardServices = ({ onClick, service }: { onClick: () => void; service: IService }) => {
  return (
    <div className="Container_Ser w-56  h-72 lg:max-w-full lg:flex " onClick={onClick}>
      <div className="Image_containerSec">
        {/* <div className="Image_background"></div> */}
        <img src="/images/Secado.png" className="sec-img"></img>
      </div>
      <div className="flex flex-col items-center justify-center text-white p-0n  shadow rounded-lg">
        <h2 className="mt-4 font-bold text-xl text-white text-right">{service?.name}</h2>

        <p className="text-xs text-gray-500 text-center mt-48">Lorem ipsum dolor sit amet, consectetur adipisicing eli</p>
      </div>
    </div>
  )
}

export default CardServices
