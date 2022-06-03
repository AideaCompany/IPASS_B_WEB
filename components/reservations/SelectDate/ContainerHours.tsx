import Spin from '@/components/Spin'
import useAuth from '@/providers/AuthContext'
import useCar from '@/providers/CarContext'
import { listAvailableHourFn } from '@/services/services'
import { updateShoppingCardServiceFn, validateShoppingCardFn } from '@/services/shoppingCar'
import { availableHours, IService, IServiceStaffer } from '@/types/interfaces/services/Services.interface'
import { IShoppingService } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { Modal } from 'antd'
import moment, { Moment } from 'moment-timezone'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import CardHour from './CardHour'
import ListHours from './ListHours'

const ContainerHours = ({ day }: { day: Moment }) => {
  const [validHours, setValidHours] = useState<availableHours[][]>([])
  const [HourSelect, setHourSelect] = useState('')
  const [loading, setLoading] = useState(true)
  const [validHoursMorning, setValidHoursMorning] = useState<string[]>([])
  const [validHoursAfternoon, setValidHoursAfternoon] = useState<string[]>([])
  const [validHoursNight, setValidHoursNight] = useState<string[]>([])
  const [hoursToShowModal, setHoursToShowModal] = useState<availableHours[][]>([])
  const [showModal, setShowModal] = useState(false)
  const { car } = useCar()
  const { user } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (car) {
      getData()
    }
  }, [day, car])

  const getData = async () => {
    setLoading(true)
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
    setValidHours(hours)
    const MyArray: string[] = []

    hours.forEach(element => {
      MyArray.push(element[0].hour.split(':')[0])
    })
    const MyArrayS = new Set(MyArray)
    //@ts-ignore
    const result = [...MyArrayS]
    setValidHoursMorning(result.filter(result => result < 12))
    setValidHoursAfternoon(result.filter(result => result >= 12 && result < 17))
    setValidHoursNight(result.filter(result => result >= 17))
    setLoading(false)
  }

  const onClickHour = (value: string) => {
    setHourSelect(value)
    setShowModal(true)
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
    await validateShoppingCardFn(user?._id as string)
    router.push('history')
  }

  useEffect(() => {
    if (HourSelect) {
      setHoursToShowModal(validHours.filter(e => parseInt(e[0].hour.split(':')[0]) === parseInt(HourSelect)))
    }
  }, [HourSelect])

  return (
    <>
      <Spin loading={loading}>
        <div className="Container_Main_H ">
          <div className="Container_Times ">
            <ListHours onClick={onClickHour} title={'Mañana'} hours={validHoursMorning} />
            <ListHours onClick={onClickHour} title={'Tarde'} hours={validHoursAfternoon} />
            <ListHours onClick={onClickHour} title={'Noche'} hours={validHoursNight} />
          </div>
        </div>
      </Spin>
      <Modal
        title="Selecciona tu hora de reserva"
        visible={showModal}
        onOk={() => {
          setShowModal(false)
        }}
        onCancel={() => {
          setShowModal(false)
        }}
      >
        <div className="box_Hour grid grid-cols-6 gap-4">
          {hoursToShowModal.map((e, j) => (
            <React.Fragment key={j}>
              <CardHour onClick={() => onClick(e)} hour={e[0].hour} />
            </React.Fragment>
          ))}
        </div>
      </Modal>
    </>
  )
}

export default ContainerHours
