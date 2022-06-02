import Spin from '@/components/Spin'
import useAuth from '@/providers/AuthContext'
import useCar from '@/providers/CarContext'
import { listAvailableHourFn } from '@/services/services'
import { goPayShoppingCardFn, updateShoppingCardServiceFn } from '@/services/shoppingCar'
import { availableHours, IService, IServiceStaffer } from '@/types/interfaces/services/Services.interface'
import { IShoppingService } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import moment, { Moment } from 'moment-timezone'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ListHours from './ListHours'

const ContainerHours = ({ day }: { day: Moment }) => {
  const [validHoursMorning, setValidHoursMorning] = useState<availableHours[][]>([])
  const [validHoursAfternoon, setValidHoursAfternoon] = useState<availableHours[][]>([])
  const [validHoursNight, setValidHoursNight] = useState<availableHours[][]>([])
  const [loading, setLoading] = useState(false)
  const { car, getData: updateCar } = useCar()
  const { user } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (car) {
      getData()
    }
  }, [day, car])

  const getData = async () => {
    setLoading(true)
    console.log(car)
    const hours = (
      await listAvailableHourFn(
        (car?.services[0].store as IStores)._id as string,
        (car?.services as IShoppingService[]).filter(e => !e.staff).map(service => (service.service as IService)._id) as string[],
        (car?.services as IShoppingService[])
          .filter(e => e.staff)
          .map(service => ({ service: (service.service as IService)._id, staff: (service.staff as IStaff)._id })) as IServiceStaffer[],
        day
      )
    ).filter(e => {
      if (moment.tz('America/Guatemala').isSame(day, 'day')) {
        if (
          moment
            .tz('America/Guatemala')
            .isAfter(moment.tz('America/Guatemala').set({ hour: parseInt(e[0].hour.split(':')[0]), minutes: parseInt(e[0].hour.split(':')[1]) }))
        ) {
          return false
        }
        return true
      } else {
        return true
      }
    })
    console.log(hours)
    setValidHoursMorning(hours.filter(e => parseInt(e[0].hour.split(':')[0]) < 12))
    setValidHoursAfternoon(hours.filter(e => parseInt(e[0].hour.split(':')[0]) >= 12 && parseInt(e[0].hour.split(':')[0]) < 17))
    setValidHoursNight(hours.filter(e => parseInt(e[0].hour.split(':')[0]) >= 17))
    setLoading(false)
  }

  const onClick = async (value: availableHours[]) => {
    for (const newValue of value) {
      const actualElementCar = car?.services.find(e => newValue.service._id === ((e as IShoppingService).service as IService)._id)
      await updateShoppingCardServiceFn(user?._id as string, actualElementCar?._id as string, {
        service: (newValue?.service as IService)._id,
        staff: (newValue?.staffer as IStaff)._id,
        hour: newValue.hour,
        day,
        store: (car?.services[0].store as IStores)._id
      })
    }
    await goPayShoppingCardFn(user?._id as string)
    updateCar()
    router.push('payment')
  }

  return (
    <Spin loading={loading}>
      <div className="Container_Main_H ">
        <div className="Container_Times ">
          <ListHours onClick={onClick} title={'Mañana'} hours={validHoursMorning} />
          <ListHours onClick={onClick} title={'Tarde'} hours={validHoursAfternoon} />
          <ListHours onClick={onClick} title={'Noche'} hours={validHoursNight} />
        </div>
      </div>
    </Spin>
  )
}

export default ContainerHours
