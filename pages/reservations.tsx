import AskContinueOrAdd from '@/components/AskContinueOrAdd'
import Layout from '@/components/Layout'
import ListStores from '@/components/reservations/ListStores'
import Select from '@/components/reservations/Select'
import SelectDate from '@/components/reservations/SelectDate'
import Services from '@/components/reservations/Services'
import Services2 from '@/components/reservations/Services2'
import Staffers from '@/components/reservations/Staffers'
import useAuth from '@/providers/AuthContext'
import useCar from '@/providers/CarContext'
import { addShoppingCardFn } from '@/services/shoppingCar'
import { getAllStores } from '@/services/stores'
import { IService } from '@/types/interfaces/services/Services.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { GetServerSidePropsContext } from 'next'
import React, { useState } from 'react'

export enum stepsPageReservation {
  'store' = 'store',
  'Select' = 'Select',
  'services' = 'services',
  'services2' = 'services2',
  'staffers' = 'staffers',
  'hair' = 'hair',
  'Type' = 'Type',
  'selectDate' = 'selectDate'
}
const Reservations = (props: { stores: IStores[]; staffer: IStaff[] }) => {
  const { user } = useAuth()
  const { getData } = useCar()
  const [step, setStep] = useState<stepsPageReservation>(stepsPageReservation.store)
  const [selectedStore, setSelectedStore] = useState<IStores>()
  const [selectedStaff, setSelectedStaff] = useState<IStaff>()
  const [service, setService] = useState<IService>()
  const [visibleAsk, setVisibleAsk] = useState(false)
  const onChangeStore = (value: IStores) => {
    setSelectedStore(value)
  }
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

  return (
    <Layout>
      {step === stepsPageReservation.store && <ListStores onChangeStore={onChangeStore} setStep={setStep} stores={props.stores} />}
      {step === stepsPageReservation.Select && <Select setStep={setStep} />}
      {step === stepsPageReservation.staffers && selectedStore && (
        <Staffers onChangeStaff={onChangeStaff} selectedStore={selectedStore} setStep={setStep} />
      )}
      {/* {step === stepsPageReservation.hair && <Hair setStep={setStep} stores={props.stores} />} */}
      {step === stepsPageReservation.services && selectedStore && <Services onChange={onChangeService} selectedStore={selectedStore} />}
      {step === stepsPageReservation.services2 && selectedStore && selectedStaff && (
        <Services2 selectedStore={selectedStore} selectedStaff={selectedStaff} setStep={setStep} />
      )}
      {step === stepsPageReservation.selectDate && <SelectDate />}
      {/* {step === stepsPageReservation.Type && <Type setStep={setStep} stores={props.stores} />} */}
      <AskContinueOrAdd goHours={goHours} goStart={goStart} visible={visibleAsk} onCancel={() => setVisibleAsk(false)} />
    </Layout>
  )
}

export default Reservations

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const stores = await getAllStores()

  return { props: { stores } }
}
