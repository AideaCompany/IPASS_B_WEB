import { IService } from '@/types/interfaces/services/Services.interface'
import { IServiceType } from '@/types/interfaces/ServiceType/serviceType.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { generes, IStores } from '@/types/interfaces/Stores/stores.interface'
import React, { useContext, useState } from 'react'
export enum stepsPageReservation {
  'Genere' = 'Genere',
  'store' = 'store',
  'Select' = 'Select',
  'servicesType' = 'servicesType',
  'services' = 'services',
  'servicesByStaffer' = 'servicesByStaffer',
  'staffers' = 'staffers',
  'hair' = 'hair',
  'Type' = 'Type',
  'selectDate' = 'selectDate',
  'payment' = 'payment'
}
type reservationContext = {
  selectedStore: IStores | undefined
  setSelectedStore: React.Dispatch<React.SetStateAction<IStores | undefined>>
  selectedStaff: IStaff | undefined
  setSelectedStaff: React.Dispatch<React.SetStateAction<IStaff | undefined>>
  selectedService: IService | undefined
  setSelectedService: React.Dispatch<React.SetStateAction<IService | undefined>>
  visibleAsk: boolean
  setVisibleAsk: React.Dispatch<React.SetStateAction<boolean>>
  setStep: React.Dispatch<React.SetStateAction<stepsPageReservation>>
  genere: generes
  setGenere: React.Dispatch<React.SetStateAction<generes>>
  step: stepsPageReservation
  selectedServiceType: IServiceType | undefined
  setSelectedServiceType: React.Dispatch<React.SetStateAction<IServiceType | undefined>>
  selected: stepsPageReservation.services | stepsPageReservation.staffers
  setSelected: React.Dispatch<React.SetStateAction<stepsPageReservation.services | stepsPageReservation.staffers>>
}
const ReservationContext = React.createContext<reservationContext>({} as reservationContext)

export const ReservationProvider = (props: { children: JSX.Element; currentStep: stepsPageReservation }) => {
  //props
  const { children, currentStep } = props
  //States
  const [selectedStore, setSelectedStore] = useState<IStores | undefined>()
  const [selectedStaff, setSelectedStaff] = useState<IStaff | undefined>()
  const [selectedService, setSelectedService] = useState<IService | undefined>()
  const [selectedServiceType, setSelectedServiceType] = useState<IServiceType | undefined>()
  const [visibleAsk, setVisibleAsk] = useState<boolean>(false)
  const [step, setStep] = useState(currentStep)
  const [genere, setGenere] = useState<generes>(generes.ALL)
  const [selected, setSelected] = useState<stepsPageReservation.services | stepsPageReservation.staffers>(stepsPageReservation.services)
  return (
    <ReservationContext.Provider
      value={{
        selected,
        setSelected,
        setSelectedServiceType,
        selectedServiceType,
        genere,
        setGenere,
        visibleAsk,
        setVisibleAsk,
        selectedService,
        setSelectedService,
        selectedStaff,
        setSelectedStaff,
        step,
        setStep,
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
