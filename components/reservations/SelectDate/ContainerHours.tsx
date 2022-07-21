import Spin from '@/components/Spin'
import useAuth from '@/providers/AuthContext'
import useCar from '@/providers/CarContext'
import { listAvailableHourFn } from '@/services/services'
import { goPayShoppingCardFn, updateShoppingCardServiceFn } from '@/services/shoppingCar'
import { availableHours, IService, IServiceStaffer } from '@/types/interfaces/services/Services.interface'
import { IShoppingService } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { Modal } from 'antd'
import moment, { Moment } from 'moment-timezone'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ListHours from './ListHours'

const ContainerHours = ({ day }: { day: Moment }) => {
  const [validHours, setValidHours] = useState<availableHours[][]>([])
  const [loading, setLoading] = useState(true)
  const { car, getData: updateCar } = useCar()
  const [validHoursMorning, setValidHoursMorning] = useState<string[]>([])
  const [validHoursAfternoon, setValidHoursAfternoon] = useState<string[]>([])
  const [validHoursNight, setValidHoursNight] = useState<string[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selectedHour, setSelectedHour] = useState<availableHours[]>([])
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
        (car?.services[0].store as IStores)?._id as string,
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
    setValidHoursMorning(
      result.filter(result => result < 12).map(l => hours.filter(e => parseInt(e[0].hour.split(':')[0]) === parseInt(l))[0][0].hour)
    )
    setValidHoursAfternoon(
      result.filter(result => result >= 12 && result < 17).map(l => hours.filter(e => parseInt(e[0].hour.split(':')[0]) === parseInt(l))[0][0].hour)
    )
    setValidHoursNight(
      result.filter(result => result >= 17).map(l => hours.filter(e => parseInt(e[0].hour.split(':')[0]) === parseInt(l))[0][0].hour)
    )
    setLoading(false)
  }

  const onClickHour = (value: string) => {
    setSelectedHour(validHours.find(e => parseInt(e[0].hour.split(':')[0]) === parseInt(value)) ?? [])
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
    await goPayShoppingCardFn(user?._id as string)
    updateCar()
    router.push('payment')
  }

  return (
    <>
      <Spin loading={loading}>
        <div className="Container_Main_H ">
          <div className="Container_Times   ">
            <ListHours onClick={onClickHour} title={'Por la Mañana'} hours={validHoursMorning} />
            <ListHours onClick={onClickHour} title={'Tarde'} hours={validHoursAfternoon} />
            <ListHours onClick={onClickHour} title={'Noche'} hours={validHoursNight} />
          </div>
        </div>
      </Spin>
      <Modal
        title="Resumen de tu reserva"
        visible={showModal}
        okText={'Aceptar'}
        cancelText={'Cambie de opinion'}
        onOk={() => {
          onClick(selectedHour)
          setShowModal(false)
        }}
        onCancel={() => {
          setShowModal(false)
        }}
      >
        <div className="box_Hour">
          {selectedHour.map(e => (
            <div>
              <p>{`Servicio: ${e.service.name}`}</p>
              <p>{`Staffer: ${e.staffer.name}  ${e.staffer.lastName}`}</p>
            </div>
          ))}
        </div>
      </Modal>
    </>
  )
}

export default ContainerHours
