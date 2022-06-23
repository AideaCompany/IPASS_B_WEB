import { Steps } from 'antd'
import React from 'react'

const StepsEncuesta = ({ current }: { current: number }) => {
  return (
    <Steps size="small" current={current}>
      {<Steps.Step title={'Genero'} />}
      <Steps.Step title={'Sede'} />
      {/* <Steps.Step title={'Profesionales'} /> */}
      <Steps.Step title={'Servicio'} />
      <Steps.Step title={'Horario'} />
      <Steps.Step title={'Pago'} />
    </Steps>
  )
}

export default React.memo(StepsEncuesta)
