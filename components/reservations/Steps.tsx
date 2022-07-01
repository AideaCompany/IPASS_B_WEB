import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import { Steps } from 'antd'
import React from 'react'

const StepsEncuesta = ({ current }: { current: number }) => {
  const { selected } = useReservation()
  return (
    <Steps size="small" current={current}>
      <Steps.Step title={'Genero'} />
      <Steps.Step title={'Sede'} />
      <Steps.Step title={selected === stepsPageReservation.services ? 'tipo de servicio' : 'Staffers'} />
      <Steps.Step title={'Servicio'} />
      <Steps.Step title={'Horario'} />
    </Steps>
  )
}

export default React.memo(StepsEncuesta)
