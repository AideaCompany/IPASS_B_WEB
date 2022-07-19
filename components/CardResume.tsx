import { IService } from '@/types/interfaces/services/Services.interface'
import { IShoppingService } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import React from 'react'
import numeral from 'numeral'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import useCar from '@/providers/CarContext'
import { deleteShoppingCardServiceFn } from '@/services/shoppingCar'
import useAuth from '@/providers/AuthContext'
import { Popconfirm } from 'antd'
import { capitalize, formatHour } from '@/utils/utils'
import { HeartSelectedIcon, PencilIcon, TrashIcon } from 'icons/personalIcons'
const CardResume = ({ service }: { service: IShoppingService }) => {
  const { user } = useAuth()
  const { getData } = useCar()
  const deleteService = async () => {
    await deleteShoppingCardServiceFn(user?._id as string, service._id as string)
    getData()
  }

  return (
    <div className="main_payment_resumen">
      <div className="main_photo_resumen">
        <img src={(service.service as IService)?.photo?.key} className="img-card" />
      </div>
      <div className="main_info_resumen">
        <div className="Container_PR  font-helvetica text-left divide-y divide-slate-200 w-full text-ellipsis overflow-hidden">
          <strong>{capitalize((service?.service as IService)?.name)}</strong>
        </div>
        <div className="Container_TP    text-left  divide-y divide-slate-200 w-full">
          {`Staffer: ${service.staff ? (service.staff as IStaff)?.name : 'No asignado '}`}
        </div>
        <div className="Container_PR  font-helvetica  text-left divide-y divide-slate-200 w-full text-ellipsis overflow-hidden">{`Hora: ${
          service.hour ? formatHour(service.hour as string) : 'No asignado '
        }`}</div>
        <div className="Container_TP    text-left divide-y divide-slate-200 w-full text-ellipsis overflow-hidden">
          {`Precio: Q${numeral((service?.service as IService)?.price).format('0,0')} `}
        </div>
      </div>
      <div className="main_icons_resumen">
        <div className="icon_item justify-center">
          <HeartSelectedIcon />
        </div>
        <div className="icon_item content-center">
          <PencilIcon />
        </div>
        <Popconfirm title="¿Deseas eliminar del carrito?" onConfirm={deleteService} okText="Sí" cancelText="No">
          <div className="icon_item content-center">
            <TrashIcon />
          </div>
        </Popconfirm>
      </div>
    </div>
  )
}

export default CardResume
