import { IService } from '@/types/interfaces/services/Services.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import moment, { Moment } from 'moment-timezone'
import React, { useState } from 'react'
import CarouselSelectDay from './CarouselSelectDay'
import ListHours from './ListHours'

const SelectDate = ({ service, store, staff }: { service: IService[]; store: IStores; staff?: IStaff }) => {
  const [selectedDay, setSelectedDay] = useState<Moment>(moment().set({ hour: 12, minute: 0, second: 0, millisecond: 0 }))
  const onChange = (value: Moment) => setSelectedDay(value)
  return (
    <div className="container_select_date">
      <CarouselSelectDay onChange={onChange} />
      <ListHours day={selectedDay} service={service} store={store} staff={staff} />
    </div>
  )
}

export default SelectDate
