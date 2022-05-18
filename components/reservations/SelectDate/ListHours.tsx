import { listAvailableHourFn } from '@/services/services'
import { availableHours, IService } from '@/types/interfaces/services/Services.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { Moment } from 'moment-timezone'
import React, { useEffect, useState } from 'react'
import CardHour from './CardHour'

const ListHours = ({ service, store, staff, day }: { service: IService[]; store: IStores; staff?: IStaff; day: Moment }) => {
  const data = [1, 2]
  const [validHours, setValidHours] = useState<availableHours[][]>([])
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    setValidHours(
      await listAvailableHourFn(
        store._id as string,
        service.map(e => e._id as string),
        [],
        day
      )
    )
  }

  return (
    <div>
      {validHours.map((e, i) => (
        <React.Fragment key={i}>
          <CardHour hour={e[0]} />
        </React.Fragment>
      ))}
    </div>
  )
}

export default ListHours
