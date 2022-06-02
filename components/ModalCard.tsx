import { Form, Modal } from 'antd'
import React, { useState } from 'react'
import Button from './Button'
import Input from './Input'

const ModalCard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <div>
      {' '}
      <div className="New_form_Pay flex space-x-36 p-2 pl-4 font-semibold ">
        <Button title="Agregar Metodo de Pago       +" onClick={showModal} customClassName="button  bg-indigo-500 w-20 text-xs"></Button>
      </div>
      <Modal title="Información de tu tarjeta " visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form className="dates h-96 mb-0 mt-0 flex flex-col space-y-1">
          <p className="font-Gothic text-black">Por favor ingresa los siguientes datos</p>
          <Input placeHolder="Número de tarjeta " name="number" />
          <Input placeHolder="Nombre" name="name1" />
          <Input placeHolder="Apellido" name="lastName1" />

          <Input placeHolder="Fecha de expiración" name="Expired" />
          <Input placeHolder="CVV" name="CVV" />
          <Input placeHolder="ID" type="number" name="ID" />
        </Form>
      </Modal>
    </div>
  )
}

export default ModalCard
