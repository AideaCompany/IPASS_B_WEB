import { getClientCurrentShoppingCardFn } from '@/services/shoppingCar'
import { IShoppingCard } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import React, { useContext, useEffect, useState } from 'react'
import useAuth from './AuthContext'

type reservationContext = {
  car: IShoppingCard
  setCar: (car: IShoppingCard) => void
  getData: () => Promise<void>
}
const ReservationContext = React.createContext<reservationContext>({} as reservationContext)

export const ReservationProvider = (props: { children: JSX.Element }) => {
  //props
  const { children } = props
  const { user } = useAuth()
  //States
  const [car, setCar] = useState<IShoppingCard>({} as IShoppingCard)

  useEffect(() => {
    if (user) {
      getData()
    }
  }, [user])

  const getData = async () => {
    const value = await getClientCurrentShoppingCardFn(user._id as string)
    setCar(value)
  }

  return (
    <ReservationContext.Provider
      value={{
        car,
        setCar,
        getData
      }}
    >
      {children}
    </ReservationContext.Provider>
  )
}

const useReservation = () => {
  return useContext(ReservationContext)
}
export default useReservation
