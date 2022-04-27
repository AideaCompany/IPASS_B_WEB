import { loginClientFn } from '../../services/clients'
import { Form, FormInstance, message } from 'antd'
import React, { FC, useRef } from 'react'
import { registerClient, registerConfirm } from '../../types/types'
import Button from '../Button'
import Input from '../Input'
import useAuth from '../../providers/AuthContext'

const Confirm: FC<{ data: registerClient }> = ({ data }) => {
  const formRef = useRef<FormInstance>(null)
  const { login } = useAuth()
  const onConfirmLogin = async () => {
    const values = (await formRef.current?.validateFields()) as registerConfirm
    try {
      const res = await loginClientFn(values.token)
      login(res.token)
      message.success('Inició de sesión exitoso')
    } catch (error) {
      message.error('Ha ocurrido un error')
    }
  }

  return (
    <>
      <div className="container_form">
        <Form ref={formRef}>
          <p>{`Ingresa el código que hemos enviado a +${data.phone1}`}</p>
          <Input name="token" type={'number'} />
        </Form>
      </div>
      <div className="container_buttons">
        <Button title="Aceptar" isGold={true} onClick={onConfirmLogin} />
      </div>
    </>
  )
}

export default Confirm
