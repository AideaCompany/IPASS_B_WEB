import { IService } from '@/types/interfaces/services/Services.interface'
import { IShoppingService } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import React from 'react'
import numeral from 'numeral'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import useCar from '@/providers/CarContext'
import { deleteShoppingCardServiceFn } from '@/services/shoppingCar'
import useAuth from '@/providers/AuthContext'
import { Popconfirm } from 'antd'
const CardResume = ({ service }: { service: IShoppingService }) => {
  const { user } = useAuth()
  const { getData } = useCar()
  const deleteService = async () => {
    await deleteShoppingCardServiceFn(user?._id as string, service._id as string)
    getData()
  }

  return (
    <div className="Main_C_Resume  w-full h-32">
      <div className="Main_Photo_Resu w-20  h-32">
        <img src={(service.service as IService)?.photo?.key} className="sec-img w-20 h-32"></img>
      </div>
      <div className="Main_Info_Resu p-4  h-32">
        <div className="Container_PR  h-1/4 font-helvetica text-left divide-y divide-slate-200 w-full text-ellipsis overflow-hidden">
          {(service?.service as IService)?.name}
        </div>
        <div className="Container_TP    text-left h-1/4  divide-y divide-slate-200 w-full">
          {`Staffer: ${service.staff ? (service.staff as IStaff)?.name : 'No asignado '}`}
        </div>
        <div className="Container_PR  font-helvetica h-1/4  text-left divide-y divide-slate-200 w-full text-ellipsis overflow-hidden">{`Hora: ${
          service.hour ?? 'No asignado '
        }`}</div>
        <div className="Container_TP    text-left h-1/4 divide-y divide-slate-200 w-full text-ellipsis overflow-hidden">
          {`Precio: Q${numeral((service?.service as IService)?.price).format('0,0')} `}
        </div>
      </div>
      <div className="Main_Icons_Resu justify-center p-4 h-32">
        <div className="Main_I_Heart w-20 justify-center h-1/3 cursor-pointer">
          <img src="/images/Heart.png" className="sec-img"></img>
        </div>
        <div className="Main_I_Pencil w-20  content-center h-1/3 cursor-pointer">
          <img src="/images/Pencil.png" className="sec-img"></img>
        </div>
        <Popconfirm title="¿Deseas eliminar del carrito?" onConfirm={deleteService} okText="Sí" cancelText="No">
          <div className="Main_I_Gar w-20 content-center h-1/3 cursor-pointer">
            <img src="/images/Garbage.png" className="sec-img"></img>
          </div>
        </Popconfirm>
      </div>
    </div>
  )
}

export default CardResume
