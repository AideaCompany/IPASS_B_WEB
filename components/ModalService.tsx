import useAuth from '@/providers/AuthContext'
import useCar from '@/providers/CarContext'
import useReservation from '@/providers/ReservationContext'
import { addShoppingCardFn } from '@/services/shoppingCar'
import { IService } from '@/types/interfaces/services/Services.interface'
import { IServiceType } from '@/types/interfaces/ServiceType/serviceType.interface'
import { HeartOutlined } from '@ant-design/icons'
import numeral from 'numeral'
import React from 'react'
import Button from './Button'

const ModalService = ({ service, setVisible }: { service: IService; setVisible: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { setSelectedService, setVisibleAsk, selectedStore, selectedStaff } = useReservation()
  const { getData } = useCar()
  const { user } = useAuth()
  const onClick = async (value: IService) => {
    await addShoppingCardFn(user?._id as string, {
      service: value?._id as string,
      store: selectedStore?._id as string,
      staff: selectedStaff?._id as string
    })
    await getData()
    setVisible(false)
    setVisibleAsk(true)
    setSelectedService(value)
  }
  return (
    <div style={{ zIndex: '99999999' }}>
      <div className="Main_Modal_Service m-0 w-72">
        <div className="Question_Information w-full  mt-2 text-center text-xs">
          <p>
            <HeartOutlined style={{ fontSize: '20px' }} /> Agregar a favoritos
          </p>
        </div>
        <div className="Question_Information w-full font-helvetica mt-2 text-center divide-y divide-slate-200 font-bold text-base">
          <p> {service?.name}</p>
        </div>
        <div className="Information_Modal flex w-full">
          <div className="Question_Information w-1/2 font-bold font-helvetica mt-2 text-left text-sm ">
            <p> Tiempo de duración</p>
          </div>
          <div className="Container_Rate w-1/2 mt-2 text-right ">
            <p> {`${service?.returnTime} min`}</p>
          </div>
        </div>
        <div className="Information_Modal flex w-full">
          <div className="Question_Information font-bold w-1/2 font-helvetica content-center pt-2  mt-2 text-left text-sm divide-y divide-slate-200">
            <p> Tipo de servicio</p>
          </div>
          <div className="Container_Rate w-1/2  mt-2 divide-y text-right divide-slate-200">
            <p>{(service?.type as IServiceType)?.name}</p>
          </div>
        </div>
        <div className="Information_Modal flex w-full ">
          <div className="Question_Information font-bold w-1/2 font-helvetica content-center pt-2  mt-2 text-left text-sm divide-y divide-slate-200">
            <p> Precio</p>
          </div>
          <div className="Container_Rate w-1/2  mt-4 divide-y text-right divide-slate-200">
            <p>{`Q${numeral(service?.price).format('0,0')}`}</p>
          </div>
        </div>
        <div style={{ marginTop: '8px' }} className="Information_Modal font-bold  w-full">
          <p> Descripción</p>
        </div>
        <div className="Information_Modal border h-10 p-2 w-full divide-y divide-slate-200">
          <p> {service.description ?? ''}</p>
        </div>
        {/* <div style={{ marginTop: '8px' }} className="Information_Modal font-bold w-full divide-y divide-slate-200">
          <p> Quienes lo realizan:</p>
        </div>
        <div className="Information_Modal border p-2 h-10 w-full divide-y divide-slate-200">
          <p> Pedro, Juan ...... </p>
        </div> */}

        <div className="Container_Comments  mt-8  w-full ">
          <Button title="Seleccionar" onClick={() => onClick(service)} customClassName="w-full"></Button>
        </div>
      </div>
    </div>
  )
}

export default ModalService
