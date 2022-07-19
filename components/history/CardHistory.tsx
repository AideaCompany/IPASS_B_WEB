import { validateShoppingStatus } from '@/utils/utils'
import moment from 'moment-timezone'
import { useRouter } from 'next/router'
import React from 'react'
import { IShoppingCard, IShoppingService } from '../../types/interfaces/shoppingCard/shoppingCard.interface'
import Button from '../Button'
const CardHistory = ({ history }: { history: IShoppingCard }) => {
  const firstService: IShoppingService = history.services[0]
  const router = useRouter()
  const onClick = () => {}

  const goToDetail = () => {
    router.push({ pathname: '/reserve/[id]', query: { id: history._id } })
  }
  return (
    <div onClick={goToDetail} className=" h-56 cursor-pointer  w-80 border-2 border-indigo-500/100 p-4 m-4">
      <p className="text-center text-black font-Gothic font-bold text-xl">Corte de cabello</p>
      <div className="w-full flex pt-4">
        <div className="w-1/2  font bold">
          <p> Cantidad de servicios:</p>
          <p> Dìa de servicios:</p>
          <p> Status:</p>
        </div>
        <div className="w-1/2 text-left">
          <p>{` ${history?.services?.length}`}</p>
          <p>{` ${moment
            .tz(firstService?.day as string, 'America/Guatemala')
            .set({ hour: parseInt((firstService?.hour as string)?.split(':')[0]), minute: parseInt((firstService?.hour as string)?.split(':')[1]) })
            .format('DD/MM/YYYY hh:mm a')}`}</p>
          <p>{`${validateShoppingStatus(history?.status)}`}</p>
        </div>
      </div>
      <div className="container_buttons w-full justify-center flex space-x-12 p-4">
        <div className="change ">
          <Button title="Modificar " onClick={onClick} customClassName="button w-1/2 text-xs" />
        </div>
        <div className="cancel ">
          <Button title="Cancelar" onClick={onClick} customClassName="button w-1/2  text-xs" />
        </div>
      </div>
    </div>
  )
}

export default CardHistory
