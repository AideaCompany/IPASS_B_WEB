import { Form, FormInstance } from 'antd'
import countries from 'country-data'
import React, { useRef } from 'react'
import DatePicker from '../FormComponents/DatePicker'
import Input from '../FormComponents/Input'
import InputNumber from '../FormComponents/InputNumber'
import Selector from '../FormComponents/Selector'
const FormComponent = () => {
  const formRef = useRef<FormInstance>(null)
  const formItems = [
    {
      type: 'input',
      label: 'Nombre 1',
      required: true,
      name: 'name1'
    },
    {
      type: 'input',
      label: 'Nombre 2',
      required: true,
      name: 'name2'
    },
    {
      type: 'input',
      label: 'Apellido 1',
      required: true,
      name: 'lastName1'
    },
    {
      type: 'input',
      label: 'Apellido 2',
      required: false,
      name: 'lastName2'
    },
    {
      type: 'select',
      label: 'País',
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
      label: 'Celular 1',
      name: 'phone1',
      required: true
    },
    {
      type: 'input',
      label: 'Dirección privada',
      name: 'privateAddress',
      required: false
    },
    {
      type: 'input',
      label: 'Dirección de trabajo',
      name: 'businessAddress',
      required: false
    },
    {
      type: 'input',
      label: 'Ocupación',
      name: 'occupation',
      required: false
    },
    {
      type: 'date',
      label: 'Fecha de nacimiento',
      name: 'age',
      required: false
    },
    {
      type: 'select',
      label: 'Género',
      required: true,
      name: 'sex',
      values: ['Masculino', 'Femenino'].map(e => ({
        value: e,
        label: e,
        icon: <></>
      }))
    },
    {
      type: 'number',
      label: 'Documento',
      name: 'document',
      required: true
    }
  ]

  return (
    <div className="form_container">
      <Form ref={formRef}>
        {formItems.map(item => {
          if (item.type === 'input') {
            return <Input item={item} />
          }
          if (item.type === 'select') {
            return <Selector formRef={formRef} placeHolder={item.label} name={item.name} values={item.values ? item.values : []} />
          }
          if (item.type === 'number') {
            return <InputNumber item={item} />
          }
          if (item.type === 'date') {
            return <DatePicker item={item} />
          }
          return ''
        })}
      </Form>
    </div>
  )
}

export default FormComponent
