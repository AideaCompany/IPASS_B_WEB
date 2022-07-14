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
    <div onClick={goToDetail} className="Container_History  cursor-pointer">
      <p className="text-center text-black font-Gothic font-bold text-xl">Corte de cabello</p>

      <p className="text-center text-black font-Gothic ">{`Cantidad de servicios: ${history?.services?.length}`}</p>
      <p className="text-center text-black font-Gothic ">{`Dia de servicios: ${moment
        .tz(firstService?.day as string, 'America/Guatemala')
        .set({ hour: parseInt((firstService?.hour as string)?.split(':')[0]), minute: parseInt((firstService?.hour as string)?.split(':')[1]) })
        .format('DD/MM/YYYY hh:mm a')}`}</p>
      <p className="text-center text-black font-Gothic ">{`Status ${validateShoppingStatus(history?.status)}`}</p>
      <div className="container_buttons w-full justify-center flex space-x-4 p-4">
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
