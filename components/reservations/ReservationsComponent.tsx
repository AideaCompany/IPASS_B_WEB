import AskContinueOrAdd from '@/components/AskContinueOrAdd'
import Select from '@/components/reservations/Select'
import SelectDate from '@/components/reservations/SelectDate'
import Services from '@/components/reservations/Service'
import Services2 from '@/components/reservations/Services2'
import Staffers from '@/components/reservations/Staffers'
import Steps from '@/components/reservations/Steps'
import ListStores from '@/components/reservations/Stores/ListStores'
import useAuth from '@/providers/AuthContext'
import useCar from '@/providers/CarContext'
import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import { addShoppingCardFn } from '@/services/shoppingCar'
import { IService } from '@/types/interfaces/services/Services.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import React, { useState } from 'react'
import Genere from './Genere'

const ReservationsComponent = () => {
  //#region  states
  const { selectedStore, step, setStep } = useReservation()
  //#region ref
  const { user } = useAuth()
  const { getData } = useCar()
  const [selectedStaff, setSelectedStaff] = useState<IStaff>()
  const [service, setService] = useState<IService>()
  const [visibleAsk, setVisibleAsk] = useState(false)

  const onChangeStaff = (value: IStaff) => {
    setSelectedStaff(value)
  }
  const onChangeService = (value: IService) => {
    setService(value)
    setVisibleAsk(true)
  }

  const addToCar = async () => {
    await addShoppingCardFn(user?._id as string, {
      service: service?._id as string,
      store: selectedStore?._id as string,
      staff: selectedStaff?._id as string
    })
    await getData()
    setVisibleAsk(false)
  }

  const goHours = async () => {
    await addToCar()
    setStep(stepsPageReservation.selectDate)
  }

  const goStart = async () => {
    await addToCar()
    setStep(stepsPageReservation.Select)
  }

  const mySteps = [
    stepsPageReservation.Genere,
    stepsPageReservation.store,
    stepsPageReservation.services,
    stepsPageReservation.selectDate,
    stepsPageReservation.payment
  ]

  return (
    <>
      <div className="Container_Reservation ">
        <div className="Container_Steps w-full ">
          <Steps current={mySteps.findIndex(e => e === step)} />
        </div>
        <div className="Container_pages ">
          {step === stepsPageReservation.Genere && <Genere />}
          {step === stepsPageReservation.store && <ListStores />}
          {step === stepsPageReservation.Select && <Select />}
          {step === stepsPageReservation.staffers && selectedStore && <Staffers onChangeStaff={onChangeStaff} selectedStore={selectedStore} />}
          {/* {step === stepsPageReservation.hair && <Hair setStep={setStep} stores={props.stores} />} */}
          {step === stepsPageReservation.services && selectedStore && <Services onChange={onChangeService} selectedStore={selectedStore} />}
          {step === stepsPageReservation.services2 && selectedStore && selectedStaff && (
            <Services2 selectedStore={selectedStore} selectedStaff={selectedStaff} />
          )}
          {step === stepsPageReservation.selectDate && <SelectDate />}
          {/* {step === stepsPageReservation.Type && <Type setStep={setStep} stores={props.stores} />} */}
          <AskContinueOrAdd goHours={goHours} goStart={goStart} visible={visibleAsk} onCancel={() => setVisibleAsk(false)} />
        </div>
      </div>

      {/* {step === stepsPageReservation.Type && <Type setStep={setStep} stores={props.stores} />} */}
    </>
  )
}

export default ReservationsComponent
