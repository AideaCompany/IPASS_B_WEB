import { Form, FormInstance } from 'antd'
import Link from 'next/link'
import React, { FC } from 'react'
import Button from '../Button'
import Checkbox from '../Checkbox'
import Input from '../Input'
import Selector from '../Selector'
import countries from 'country-data'
const RegisterComponent: FC<{ formRef: React.RefObject<FormInstance<any>>; onSubmitSignUp: () => void }> = ({ formRef, onSubmitSignUp }) => {
  return (
    <>
      <p className="font-Gothic">
        Si ya tienes una cuenta <br />
        puedes
        <Link href="/login">
          <a className="text-gold hover:underline">¡Iniciar sesión acá!</a>
        </Link>
      </p>
      <div className="container_form">
        <Form ref={formRef} initialValues={{ country: '' }}>
          <div>
            <Input placeHolder="Nombre" name="name1" />
            <Input placeHolder="Apellido" name="lastName1" />
            <Selector
              formRef={formRef}
              name={'country'}
              values={countries.callingCountries.all.map(country => ({
                value: country.countryCallingCodes[0],
                label: country.name,
                icon: <>{country.emoji}</>
              }))}
              placeHolder="Selecciona tu país"
            />
            <Input placeHolder="Celular" type="number" name="phone1" />
            <Input placeHolder="Email" type="email" name="email" />
          </div>
          <div>
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
