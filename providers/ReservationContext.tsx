import { IService } from '@/types/interfaces/services/Services.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import React, { useContext, useState } from 'react'
export enum stepsPageReservation {
  'store' = 'store',
  'Select' = 'Select',
  'services' = 'services',
  'servicesByStaffer' = 'servicesByStaffer',
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
  selectedStaff: IStaff | undefined
  setSelectedStaff: React.Dispatch<React.SetStateAction<IStaff | undefined>>
  selectedService: IService | undefined
  setSelectedService: React.Dispatch<React.SetStateAction<IService | undefined>>
  visibleAsk: boolean
  setVisibleAsk: React.Dispatch<React.SetStateAction<boolean>>
  setStep: React.Dispatch<React.SetStateAction<stepsPageReservation>>
  step: stepsPageReservation
}
const ReservationContext = React.createContext<reservationContext>({} as reservationContext)

export const ReservationProvider = (props: { children: JSX.Element; stores: IStores[]; currentStep: stepsPageReservation }) => {
  //props
  const { children, stores, currentStep } = props
  //States
  const [selectedStore, setSelectedStore] = useState<IStores | undefined>()
  const [selectedStaff, setSelectedStaff] = useState<IStaff | undefined>()
  const [selectedService, setSelectedService] = useState<IService | undefined>()
  const [visibleAsk, setVisibleAsk] = useState<boolean>(false)
  const [step, setStep] = useState(currentStep)

  return (
    <ReservationContext.Provider
      value={{
        visibleAsk,
        setVisibleAsk,
        selectedService,
        setSelectedService,
        selectedStaff,
        setSelectedStaff,
        step,
        setStep,
        stores,
        selectedStore,
        setSelectedStore
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
