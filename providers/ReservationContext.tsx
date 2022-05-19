import { IStores } from '@/types/interfaces/Stores/stores.interface'
import React, { useContext, useEffect, useState } from 'react'
import useAuth from './AuthContext'

type reservationContext = {
  stores: IStores[]
  selectedStore: IStores | undefined
  setSelectedStore: React.Dispatch<React.SetStateAction<IStores | undefined>>
  getData: () => Promise<void>
}
const ReservationContext = React.createContext<reservationContext>({} as reservationContext)

export const ReservationProvider = (props: { children: JSX.Element; stores: IStores[] }) => {
  //props
  const { children, stores } = props
  const { user } = useAuth()
  //States
  const [selectedStore, setSelectedStore] = useState<IStores | undefined>()

  useEffect(() => {
    if (user) {
      getData()
    }
  }, [user])

  const getData = async () => {
    // const value = await getClientCurrentShoppingCardFn(user._id as string)
    // setCar(value)
  }

  return (
    <ReservationContext.Provider
      value={{
        stores,
        selectedStore,
        setSelectedStore,
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
