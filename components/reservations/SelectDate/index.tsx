import moment, { Moment } from 'moment-timezone'
import React, { useState } from 'react'
import CarouselSelectDay from './CarouselSelectDay'
import ContainerHours from './ContainerHours'

const SelectDate = () => {
  const [selectedDay, setSelectedDay] = useState<Moment>(moment().set({ hour: 12, minute: 0, second: 0, millisecond: 0 }))
  const onChange = (value: Moment) => setSelectedDay(value)
  return (
    <div className="container_select_date">
      <CarouselSelectDay onChange={onChange} />
      <ContainerHours day={selectedDay} />
    </div>
  )
}

export default SelectDate
