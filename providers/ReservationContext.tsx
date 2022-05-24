import { IStores } from '@/types/interfaces/Stores/stores.interface'
import React, { useContext, useEffect, useState } from 'react'
import useAuth from './AuthContext'
export enum stepsPageReservation {
  'store' = 'store',
  'Select' = 'Select',
  'services' = 'services',
  'services2' = 'services2',
  'staffers' = 'staffers',
  'hair' = 'hair',
  'Type' = 'Type',
  'selectDate' = 'selectDate',
  'payment' = 'payment'
}
type reservationContext = {
  stores: IStores[]
  selectedStore: IStores | undefined
  setSelectedStore: React.Dispatch<React.SetStateAction<IStores | undefined>>
  getData: () => Promise<void>
  setStep: React.Dispatch<React.SetStateAction<stepsPageReservation>>
  step: stepsPageReservation
}
const ReservationContext = React.createContext<reservationContext>({} as reservationContext)

export const ReservationProvider = (props: { children: JSX.Element; stores: IStores[]; currentStep: stepsPageReservation }) => {
  //props
  const { children, stores, currentStep } = props
  const { user } = useAuth()
  //States
  const [selectedStore, setSelectedStore] = useState<IStores | undefined>()
  const [step, setStep] = useState(currentStep)

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
        step,
        setStep,
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
