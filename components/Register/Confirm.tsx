import { Form, FormInstance } from 'antd'
import React, { FC } from 'react'
import { registerClient } from '../../types/types'
import Button from '../Button'
import Input from '../Input'

const Confirm: FC<{ data: registerClient; onConfirmSignUp: () => Promise<void>; formRef: React.RefObject<FormInstance<any>> }> = ({
  data,
  onConfirmSignUp,
  formRef
}) => {
  return (
    <>
      <div className="container_form">
        <Form ref={formRef}>
          <p>{`Ingresa el código que hemos enviado a ${data.email?.replace(/(\w{1})[\w.-]+@([\w.]+\w)/, '$1*****@$2')}`}</p>
          <Input name="token" type={'number'} />
        </Form>
      </div>
      <div className="container_buttons">
        <Button title="Aceptar" isGold={true} onClick={onConfirmSignUp} />
      </div>
    </>
  )
}

export default Confirm
