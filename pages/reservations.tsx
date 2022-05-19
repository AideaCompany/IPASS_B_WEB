import Layout from '@/components/Layout'
import ListStores from '@/components/reservations/ListStores'
import Select from '@/components/reservations/Select'
import SelectDate from '@/components/reservations/SelectDate'
import Services from '@/components/reservations/Services'
import Services2 from '@/components/reservations/Services2'
import Staffers from '@/components/reservations/Staffers'
import Steps from '@/components/reservations/Steps'
import { getAllStores } from '@/services/stores'
import { IService } from '@/types/interfaces/services/Services.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { GetServerSidePropsContext } from 'next'
import { FormInstance } from 'rc-field-form'
import React, { useCallback, useRef, useState } from 'react'

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
  //#region  states
  const [current, setCurrent] = useState(0)
  const [step, setStep] = useState<stepsPageReservation>(stepsPageReservation.selectDate)
  const [selectedStore, setSelectedStore] = useState<IStores>()
  const [selectedStaff, setSelectedStaff] = useState<IStaff>()
  const [service, setService] = useState<IService>()
  const [data, setData] = useState<IStores>()
  //#region ref
  const formRef = useRef<FormInstance<IStores>>(null)

  const onChangeStore = (value: IStores) => {
    setSelectedStore(value)
  }
  const onChangeStaff = (value: IStaff) => {
    setSelectedStaff(value)
  }
  const onChangeService = (value: IService) => {
    setService(value)
  }
  //#region functions
  const HandleChangeCurrent = useCallback(
    (type: 'next' | 'back') => {
      const currentData = formRef.current?.getFieldsValue() as IStores
      setData(currentVal => ({ ...currentVal, ...currentData }))
      if (type === 'next') {
        setCurrent(current + 1)
      } else {
        setCurrent(current - 1)
      }
    },
    [current]
  )
  return (
    <Layout>
      <div className="Container_Reservation">
        <div className="Container_Steps w-full ">
          <Steps current={current} />
        </div>
        <div className="Container_pages ">
          {current === 0 && step === stepsPageReservation.store && (
            <ListStores onChangeStore={onChangeStore} setStep={setStep} stores={props.stores} />
          )}
          {current === 1 && step === stepsPageReservation.Select && <Select setStep={setStep} />}
          {current === 2 && step === stepsPageReservation.staffers && selectedStore && (
            <Staffers onChangeStaff={onChangeStaff} selectedStore={selectedStore} setStep={setStep} />
          )}
          {/* {step === stepsPageReservation.hair && <Hair setStep={setStep} stores={props.stores} />} */}
          {current === 3 && step === stepsPageReservation.services && selectedStore && (
            <Services onChange={onChangeService} selectedStore={selectedStore} setStep={setStep} />
          )}
          {current === 4 && step === stepsPageReservation.services2 && selectedStore && selectedStaff && (
            <Services2 selectedStore={selectedStore} selectedStaff={selectedStaff} setStep={setStep} />
          )}
          {current === 5 && step === stepsPageReservation.selectDate && selectedStore && selectedStaff && (
            <Services2 selectedStore={selectedStore} selectedStaff={selectedStaff} setStep={setStep} />
          )}
          {current === 6 && step === stepsPageReservation.selectDate && <SelectDate store={selectedStore} service={service} />}
          {/* {step === stepsPageReservation.Type && <Type setStep={setStep} stores={props.stores} />} */}
        </div>
      </div>
    </Layout>
  )
}

export default Reservations

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const stores = await getAllStores()

  return { props: { stores } }
}
