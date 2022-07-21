import AskContinueOrAdd from '@/components/AskContinueOrAdd'
import Select from '@/components/reservations/Select'
import SelectDate from '@/components/reservations/SelectDate'
import Services from '@/components/reservations/Service'
import ServicesByStaff from '@/components/reservations/Service/ServicesByStaff'
import Staffers from '@/components/reservations/Staffers'
import Steps from '@/components/reservations/Steps'
import ListStores from '@/components/reservations/Stores/ListStores'
import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import Genere from './Genere'
import ServiceType from './ServiceType'

const ReservationsComponent = () => {
  //#region  states
  const { selectedStore, step, setStep, selectedStaff, selectedServiceType, visibleAsk, setVisibleAsk } = useReservation()
  //#region ref

  const goHours = async () => {
    setStep(stepsPageReservation.selectDate)
    setVisibleAsk(false)
  }

  const goStart = async () => {
    setStep(stepsPageReservation.Select)
    setVisibleAsk(false)
  }

  const mySteps = [
    { step: stepsPageReservation.Genere, selectedStep: 0, title: 'Genero' },
    { step: stepsPageReservation.store, selectedStep: 1, title: 'Sede' },
    { step: stepsPageReservation.Select, selectedStep: 1, title: 'Staffer o servicio' },
    { step: stepsPageReservation.servicesType, selectedStep: 2, title: 'Tipo de servicio' },
    { step: stepsPageReservation.services, selectedStep: 3, title: 'Servicio' },
    { step: stepsPageReservation.staffers, selectedStep: 2, title: 'Staffers' },
    { step: stepsPageReservation.selectDate, selectedStep: 4, title: 'Horarios' }
  ]

  return (
    <>
      <div className="Container_Reservation ">
        <p className="Title font-Gothic text-right pt-4 ">{mySteps.find(e => e.step === step)?.title ?? 'Proceso de reserva'}</p>
        <div className="Container_Steps w-full pt-4">
          <Steps current={mySteps.find(e => e.step === step)?.selectedStep ?? 0} />
        </div>
        <div className="Container_pages ">
          {step === stepsPageReservation.Genere && <Genere />}
          {step === stepsPageReservation.store && <ListStores />}
          {step === stepsPageReservation.Select && <Select />}
          {step === stepsPageReservation.staffers && selectedStore && <Staffers />}
          {/* {step === stepsPageReservation.hair && <Hair setStep={setStep} stores={props.stores} />} */}
          {step === stepsPageReservation.servicesType && selectedStore && <ServiceType />}
          {step === stepsPageReservation.services && selectedStore && selectedServiceType && <Services />}
          {step === stepsPageReservation.servicesByStaffer && selectedStore && selectedStaff && <ServicesByStaff />}
          {step === stepsPageReservation.selectDate && <SelectDate />}
          <AskContinueOrAdd
            setVisible={setVisibleAsk}
            goHours={goHours}
            goStart={goStart}
            visible={visibleAsk}
            onCancel={() => setVisibleAsk(false)}
          />
        </div>
      </div>
    </>
  )
}

export default ReservationsComponent
