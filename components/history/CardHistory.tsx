import { IService } from '@/types/interfaces/services/Services.interface'
import moment from 'moment-timezone'
import React from 'react'
import { IShoppingCard, IShoppingService } from '../../types/interfaces/shoppingCard/shoppingCard.interface'
const CardHistory = ({ history }: { history: IShoppingCard }) => {
  const firstService: IShoppingService = history.services[0]
  return (
    <div className="Container_History ">
      <p className="text-center text-black font-Gothic font-bold text-xl">{(history.services[0].service as IService).name}</p>

      <p className="text-center text-black font-Gothic ">{`Cantidad de servicios: ${history?.services?.length}`}</p>
      <p className="text-center text-black font-Gothic ">{`Dia de servicios: ${moment
        .tz(firstService?.day as string, 'America/Guatemala')
        .set({ hour: parseInt((firstService?.hour as string)?.split(':')[0]), minute: parseInt((firstService?.hour as string)?.split(':')[1]) })
        .format('DD/MM/YYYY hh:mm a')}`}</p>
      <p className="text-center text-black font-Gothic ">{`Status ${history?.status}`}</p>
    </div>
  )
}

export default CardHistory
