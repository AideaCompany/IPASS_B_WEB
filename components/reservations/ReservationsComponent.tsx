import AskContinueOrAdd from '@/components/AskContinueOrAdd'
import Select from '@/components/reservations/Select'
import SelectDate from '@/components/reservations/SelectDate'
import Services from '@/components/reservations/Service'
import ServicesByStaff from '@/components/reservations/ServicesByStaff'
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
import React from 'react'

const ReservationsComponent = () => {
  //#region  states
  const { selectedStore, step, setStep, selectedStaff, selectedService, visibleAsk, setVisibleAsk } = useReservation()
  //#region ref
  const { user } = useAuth()
  const { getData } = useCar()

  const addToCar = async () => {
    await addShoppingCardFn(user?._id as string, {
      service: selectedService?._id as string,
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
          {step === stepsPageReservation.staffers && selectedStore && <Staffers />}
          {/* {step === stepsPageReservation.hair && <Hair setStep={setStep} stores={props.stores} />} */}
          {step === stepsPageReservation.services && selectedStore && <Services />}
          {step === stepsPageReservation.servicesByStaffer && selectedStore && selectedStaff && <ServicesByStaff />}
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
