import { Form, FormInstance } from 'antd'
import Link from 'next/link'
import React, { FC } from 'react'
import Button from '../Button'
import Checkbox from '../Checkbox'
import Input from '../FormComponents/Input'
import InputNumber from '../FormComponents/InputNumber'
import Selector from '../FormComponents/Selector'
import countries from 'country-data'
const RegisterComponent: FC<{ formRef: React.RefObject<FormInstance<any>>; onSubmitSignUp: () => void }> = ({ formRef, onSubmitSignUp }) => {
  const formItems = [
    {
      type: 'input',
      label: 'Nombre',
      required: true,
      name: 'name1'
    },
    {
      type: 'input',
      label: 'Apellido',
      required: true,
      name: 'lastName1'
    },
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
      label: 'Celular',
      name: 'phone1',
      required: true
    },
    {
      type: 'email',
      label: 'Correo electrónico',
      name: 'email',
      required: true
    }
  ]

  return (
    <>
      <p className="font-Gothic text-center">
        Si ya tienes una cuenta <br />
        puedes
        <Link href="/login">
          <a className="text-gold hover:underline text-center">¡Iniciar sesión acá!</a>
        </Link>
      </p>
      <div className="container_form">
        <Form ref={formRef} initialValues={{ country: countries.callingCountries.all.find(e => e.name === 'Guatemala')?.countryCallingCodes[0] }}>
          <div>
            <>
              {formItems.map((item, i) => {
                let element = <></>
                if (item.type === 'input') {
                  element = <Input item={item} />
                }
                if (item.type === 'select') {
                  element = (
                    <Selector
                      required={item.required}
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
                if (item.type === 'email') {
                  element = <Input item={item} />
                }

                return <React.Fragment key={i}>{element}</React.Fragment>
              })}
            </>
          </div>
          <div className="mt-4 ">
            <Checkbox name={'terms'} label="Acepto términos y condiciones" />
          </div>
        </Form>
      </div>

      <div className="container_buttons">
        <Button title="Registrarse" isGold={true} onClick={onSubmitSignUp} />
      </div>
    </>
  )
}

export default RegisterComponent
