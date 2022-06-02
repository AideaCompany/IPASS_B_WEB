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

const hsMorning = ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00']
const hsAfternoon = ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']
const hsNight = ['20:00', '21:00', '22:00']

const ContainerHours = ({ day }: { day: Moment }) => {
  const [validHours, setvalidHours] = useState<availableHours[][]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedHour, setselectedHour] = useState('')
  const { car } = useCar()
  const { user } = useAuth()
  const router = useRouter()

  console.log(parseInt(selectedHour.split(':')[0]))
  useEffect(() => {
    if (selectedHour !== '') {
      setOpen(true)
    }
  }, [selectedHour])

  useEffect(() => {
    getData()
  }, [day])

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
    setvalidHours(hours)
    // setValidHoursMorning(hours.filter(e => parseInt(e[0].hour.split(':')[0]) < 12))
    // setValidHoursAfternoon(hours.filter(e => parseInt(e[0].hour.split(':')[0]) >= 12 && parseInt(e[0].hour.split(':')[0]) < 17))
    // setValidHoursNight(hours.filter(e => parseInt(e[0].hour.split(':')[0]) >= 17))
    setLoading(false)
  }

  const onClick = async (value: availableHours[]) => {
    for (const newValue of value) {
      const actualElementCar = car.services.find(e => newValue.service._id === ((e as IShoppingService).service as IService)._id)
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

  const handleClose = () => {
    setOpen(false)
    setselectedHour('')
  }

  return (
    <>
      <Spin loading={loading}>
        <div className="Container_Main_H ">
          <div className="Container_Times ">
            <div className="Title_Hour">
              <p className="font-Butler font-medium text-lef text-xl">Mañana</p>
            </div>
            <div className="box_Hour grid grid-cols-6 gap-4">
              {hsMorning.map(e => (
                <CardHour onClick={() => setselectedHour(e)} hour={e} />
              ))}
            </div>

            {/* <ListHours onClick={onClick} title={'Tarde'} hours={validHoursAfternoon} />
          <ListHours onClick={onClick} title={'Noche'} hours={validHoursNight} /> */}
          </div>
        </div>
      </Spin>
      <Modal visible={open} onCancel={handleClose}>
        <ListHours
          onClick={onClick}
          title={'Mañana'}
          hours={validHours.filter(e => parseInt(e[0].hour.split(':')[0]) == parseInt(selectedHour.split(':')[0]))}
        />
      </Modal>
    </>
  )
}

export default ContainerHours
