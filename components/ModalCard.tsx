import useAuth from '@/providers/AuthContext'
import { createCardFn } from '@/services/clients'
import { encryptValues } from '@/utils/utils'
import { Form, FormInstance, Modal } from 'antd'
import React, { useRef, useState } from 'react'
import Button from './Button'
import Input from './Input'

const ModalCard = ({ onComplete }: { onComplete: () => Promise<void> }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { user } = useAuth()
  const formRef = useRef<FormInstance>(null)
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    const data = await formRef.current?.validateFields()
    await createCardFn(user?._id as string, encryptValues(data))
    await onComplete()
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <div>
      <div className="New_form_Pay flex space-x-36 p-2 pl-4 font-semibold  ">
        <Button title="Agregar Método de Pago       +" onClick={showModal} customClassName="button  bg-indigo-500 w-20 text-xs"></Button>
      </div>
      <Modal
        title="Información de tu tarjeta"
        style={{ height: '500px' }}
        visible={isModalVisible}
        okButtonProps={{ shape: 'round', type: 'primary' }}
        onOk={handleOk}
        destroyOnClose
        onCancel={handleCancel}
      >
        <div className="overflow-auto">
          <Form ref={formRef} className="dates h-96 mb-0 mt-0 flex flex-col space-y-1">
            <p className="font-Gothic text-black">Por favor ingresa los siguientes datos</p>
            <Input required placeHolder="Número de tarjeta " name="number" />
            <Input required placeHolder="Nombre" name="name1" />
            <Input required placeHolder="Apellido" name="lastName1" />
            <Input required placeHolder="Fecha de expiración" name="Expired" />
            <Input required placeHolder="Documento" type="number" name="ID" />
          </Form>
        </div>
      </Modal>
    </div>
  )
}

export default ModalCard
