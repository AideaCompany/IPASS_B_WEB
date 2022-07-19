import useAuth from '@/providers/AuthContext'
import useCar from '@/providers/CarContext'
import { stepsPageReservation } from '@/providers/ReservationContext'
import { InvalidateShoppingCardFn } from '@/services/shoppingCar'
import { IShoppingCard } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import moment from 'moment-timezone'
import { useRouter } from 'next/router'
import numeral from 'numeral'
import React, { useEffect, useState } from 'react'
let myInterval: any
const PaymentMinutes = ({ car }: { car: IShoppingCard }) => {
  const [minutes, setMinutes] = useState('')
  const { user } = useAuth()
  const { getData: getDataCar } = useCar()
  const router = useRouter()
  useEffect(() => {
    ;(async () => {
      if (car) {
        let diff = moment.tz(car?.timeToPay, 'America/Guatemala').diff(moment.tz('America/Guatemala'), 'minutes', true)
        let segs = diff % 1
        let minutes = Math.trunc(diff)

        if (diff <= 10 && diff >= 0) {
          myInterval = setInterval(async () => {
            diff = moment.tz(car?.timeToPay, 'America/Guatemala').diff(moment.tz('America/Guatemala'), 'minutes', true)
            segs = diff % 1
            minutes = Math.trunc(diff)
            if (diff < 0) {
              clearInterval(myInterval)
              await InvalidateShoppingCardFn(user?._id as string)
              getDataCar()
              router.push(`/reservations?step=${stepsPageReservation.selectDate}`)
            }
            setMinutes(`${minutes}:${numeral(segs * 60).format('00')}`)
          }, 1000)
        } else {
          clearInterval(myInterval)
          await InvalidateShoppingCardFn(user?._id as string)
          getDataCar()
          router.push(`/reservations?step=${stepsPageReservation.selectDate}`)
        }
      }
    })()
    return () => {
      clearInterval(myInterval)
    }
  }, [car])
  return (
    <div className="Titles_Buy font-helvetica text-center font-bold m-6">
      <p>
        {`Tienes `} <b className="underline">{`${minutes ?? '00:00'}`}</b> {`minutos para realizar el pago`}
      </p>
    </div>
  )
}

export default React.memo(PaymentMinutes)
