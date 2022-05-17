import { IService } from '@/types/interfaces/services/Services.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import React from 'react'
import CardHour from './CardHour'

const ListHours = ({ service }: { service: IService; store: IStores; staff?: IStaff }) => {
  const data = [1, 2]
  return (
    <div>
      {data.map((e, i) => (
        <React.Fragment key={i}>
          <CardHour />
        </React.Fragment>
      ))}
    </div>
  )
}

export default ListHours
