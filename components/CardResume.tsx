import { IService } from '@/types/interfaces/services/Services.interface'
import { IShoppingService } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import React from 'react'
import numeral from 'numeral'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
const CardResume = ({ service }: { service: IShoppingService }) => {
  console.log(service)
  return (
    <div className="Main_C_Resume  w-full h-30">
      <div className="Main_Photo_Resu w-20  h-30">
        <img src={(service.service as IService)?.photo?.key} className="sec-img"></img>
      </div>
      <div className="Main_Info_Resu p-4  h-30">
        <div className="Container_PR  h-1/4 font-helvetica text-left divide-y divide-slate-200">{(service.service as IService).name}</div>
        <div className="Container_TP    text-left h-1/4  divide-y divide-slate-200">
          {`Staffer: ${service.staff ? (service.staff as IStaff)?.name1 : 'No asignado '}`}
        </div>
        <div className="Container_PR  font-helvetica h-1/4  text-left divide-y divide-slate-200">{`Hora: ${service.hour ?? 'No asignado '}`}</div>
        <div className="Container_TP    text-left h-1/4 divide-y divide-slate-200">
          {`Precio: Q${numeral((service.service as IService).price).format('0,0')} `}
        </div>
      </div>
      <div className="Main_Icons_Resu justify-center p-4 h-30">
        <div className="Main_I_Heart w-20 justify-center h-1/3">
          <img src="/images/Heart.png" className="sec-img"></img>
        </div>
        <div className="Main_I_Pencil w-20  content-center h-1/3">
          <img src="/images/Pencil.png" className="sec-img"></img>
        </div>
        <div className="Main_I_Gar w-20 content-center h-1/3">
          <img src="/images/Garbage.png" className="sec-img"></img>
        </div>
      </div>
    </div>
  )
}

export default CardResume
