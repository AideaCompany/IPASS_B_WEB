import { loginClientFn } from '../../services/clients'
import { Form, FormInstance, message } from 'antd'
import React, { FC, useRef } from 'react'
import { registerClient, registerConfirm } from '../../types/types'
import Button from '../Button'
import InputNumber from '../FormComponents/InputNumber'
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
  const formItems = [
    {
      type: 'number',
      label: '',
      name: 'token',
      required: true
    }
  ]
  return (
    <>
      <div className="container_form">
        <Form ref={formRef}>
          <p>{`Ingresa el código que hemos enviado a ${data.country} ${data.phone1}`}</p>
          <>
            {formItems.map((item, i) => {
              let element = <></>

              if (item.type === 'number') {
                element = <InputNumber item={item} />
              }

              return <React.Fragment key={i}>{element}</React.Fragment>
            })}
          </>
        </Form>
      </div>
      <div className="container_buttons">
        <Button title="Aceptar" isGold={true} onClick={onConfirmLogin} />
      </div>
    </>
  )
}

export default Confirm
