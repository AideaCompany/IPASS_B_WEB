import Spin from '@/components/Spin'
import useAuth from '@/providers/AuthContext'
import useCar from '@/providers/CarContext'
import { listAvailableHourFn } from '@/services/services'
import { updateShoppingCardServiceFn, validateShoppingCardFn } from '@/services/shoppingCar'
import { availableHours, IService, IServiceStaffer } from '@/types/interfaces/services/Services.interface'
import { IShoppingService } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import moment, { Moment } from 'moment-timezone'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ListHours from './ListHours'

// const hsMorning = ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00']
// const hsAfternoon = ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']
// const hsNight = ['20:00', '21:00', '22:00']

const ContainerHours = ({ day }: { day: Moment }) => {
  const [validHours, setvalidHours] = useState<availableHours[][]>([])
  const [open, setOpen] = useState(false)
  const [HourSelect, setHourSelect] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedHour, setselectedHour] = useState('')
  const [validHoursMorning, setValidHoursMorning] = useState<string[]>([])
  const [validHoursAfternoon, setValidHoursAfternoon] = useState<string[]>([])
  const [validHoursNight, setValidHoursNight] = useState<string[]>([])
  const [hoursToShowModal, setHoursToShowModal] = useState<string[]>([])
  const { car } = useCar()
  const { user } = useAuth()
  const router = useRouter()

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
    const MyArray: string[] = []

    hours.forEach(function (elemento, indice) {
      MyArray.push(elemento[0].hour.split(':')[0])
    })

    const MyArrayS = new Set(MyArray)
    const result = [...MyArrayS]
    function morning(result) {
      return result < 12
    }

    console.log(result.filter(morning))
    function afternoon(result) {
      return result > 12
    }

    console.log(result.filter(afternoon))

    setValidHoursMorning(result.filter(morning))
    setValidHoursAfternoon(result.filter(afternoon))
    setValidHoursNight(hours.filter(e => parseInt(e[0].hour.split(':')[0]) >= 17))
    setLoading(false)
  }

  const onClick = async (value: string) => {
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

  useEffect(() => {
    setHoursToShowModal(
      validHours
        .flat()
        .map(e => e.hour)
        .filter(e => e.split(':')[0] === HourSelect)
    )
  }, [HourSelect])

  return (
    <>
      <Spin loading={loading}>
        <div className="Container_Main_H ">
          <div className="Container_Times ">
            {/* <div className="box_Hour grid grid-cols-6 gap-4">
              {validHoursMorning.map(e => (
                <CardHour onClick={() => setselectedHour(e)} hour={e} />
              ))}
            </div> */}
            <ListHours
              hoursToShowModal={hoursToShowModal}
              onClick={onClick}
              title={'Mañana'}
              hours={validHoursMorning}
              HourSelect={HourSelect}
              setHourSelect={setHourSelect}
            />
            <ListHours
              hoursToShowModal={hoursToShowModal}
              onClick={onClick}
              title={'Tarde'}
              hours={validHoursAfternoon}
              HourSelect={HourSelect}
              setHourSelect={setHourSelect}
            />
            <ListHours
              hoursToShowModal={hoursToShowModal}
              onClick={onClick}
              title={'Noche'}
              hours={validHoursNight}
              HourSelect={HourSelect}
              setHourSelect={setHourSelect}
            />
          </div>
        </div>
      </Spin>
      {/* <Modal visible={open} onCancel={handleClose}>
        <ListHours
          onClick={onClick}
          title={'Mañana'}
          hours={validHours.filter(e => parseInt(e[0].hour.split(':')[0]) == parseInt(selectedHour.split(':')[0]))}
        />
      </Modal> */}
    </>
  )
}

export default ContainerHours
