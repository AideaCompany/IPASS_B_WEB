import { Form, FormInstance } from 'antd'
import React, { FC } from 'react'
import { registerClient } from '../../types/types'
import Button from '../Button'
import InputNumber from '../FormComponents/InputNumber'

const Confirm: FC<{ data: registerClient; onConfirmSignUp: () => Promise<void>; formRef: React.RefObject<FormInstance<any>> }> = ({
  data,
  onConfirmSignUp,
  formRef
}) => {
  const formItems = [
    {
      type: 'input',
      label: 'Código',
      required: true,
      name: 'token'
    }
  ]
  return (
    <>
      <div className="container_form ">
        <Form ref={formRef}>
          <div className=" text-center font-Gothic">
            <p>{`Ingresa el código que hemos enviado a ${data.phone1}`}</p>
          </div>
          <div className="mt-4">
            {formItems.map((item, i) => {
              let element = <></>
              if (item.type === 'input') {
                element = <InputNumber item={item} />
              }
              return <React.Fragment key={i}>{element}</React.Fragment>
            })}
          </div>
        </Form>
      </div>
      <div className="container_buttons">
        <Button title="Aceptar" isGold={true} onClick={onConfirmSignUp} />
      </div>
    </>
  )
}

export default Confirm
