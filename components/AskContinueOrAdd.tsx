import { Modal } from 'antd'
import React from 'react'
import Button from './Button'

const AskContinueOrAdd = ({
  visible,
  onCancel,
  goStart,
  goHours
}: {
  visible: boolean
  onCancel: () => void
  goStart: () => void
  goHours: () => void
}) => {
  return (
    <Modal
      onCancel={onCancel}
      footer={[
        <div key={'footer'}>
          <Button title="Ver horarios" onClick={goHours} />
          <Button title="Ver servicios" onClick={goStart} />
        </div>
      ]}
      visible={visible}
    >
      <div>
        <p>¿Desea agregar mas servicios,o ver horarios?</p>
      </div>
    </Modal>
  )
}

export default AskContinueOrAdd
