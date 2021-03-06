import { Form, FormInstance, message } from 'antd'
import countries from 'country-data'
import React, { Dispatch, SetStateAction, useRef } from 'react'
import Button from '../../components/Button'
import { sendCodeFn } from '../../services/clients'
import InputNumber from '../FormComponents/InputNumber'
import Selector from '../Selector'

const LoginComponent = ({ setIsConfirm, setData }: { setIsConfirm: Dispatch<SetStateAction<boolean>>; setData: Dispatch<SetStateAction<any>> }) => {
  const formRef = useRef<FormInstance>(null)

  const loginForm = async () => {
    const { phone1, country }: { phone1: string; country: string } = await formRef.current?.validateFields()
    const data = await sendCodeFn({ phone1, country })
    if (data) {
      setData({ phone1, country })
      setIsConfirm(true)
      message.info('Hemos enviado un código a tu whatsapp')
    } else {
      console.log('El número de teléfono no es válido')
    }
    // try {
    //   const data = await loginWebFn({ phone1, password })
    //   login(data.token)
    // } catch (error) {
    //   console.log(error)
    // }
  }
  const formItems = [
    {
      type: 'select',
      label: 'Selecciona tu país',
      required: true,
      name: 'country',
      values: countries.callingCountries.all.map(country => ({
        value: country.countryCallingCodes[0],
        label: country.name,
        icon: <>{country.emoji}</>
      }))
    },
    {
      type: 'number',
      label: ' Ingresa número de celular',
      name: 'phone1',
      required: true
    }
  ]

  return (
    <>
      <div className="container_Login_Component">
        <Form ref={formRef} initialValues={{ country: countries.callingCountries.all.find(e => e.name === 'Guatemala')?.countryCallingCodes[0] }}>
          <div className="Login_Selector">
            <>
              {formItems.map((item, i) => {
                let element = <></>

                if (item.type === 'select') {
                  element = (
                    <Selector
                      label={item.label}
                      required={true}
                      formRef={formRef}
                      placeHolder={item.label}
                      name={item.name}
                      values={item.values ? item.values : []}
                    />
                  )
                }
                if (item.type === 'number') {
                  element = <InputNumber item={item} />
                }

                return <React.Fragment key={i}>{element}</React.Fragment>
              })}
            </>
          </div>
        </Form>
      </div>
      <div className="container_buttons">
        <Button title="Iniciar sesión" isGold={true} onClick={loginForm} />
      </div>
    </>
  )
}

export default LoginComponent
