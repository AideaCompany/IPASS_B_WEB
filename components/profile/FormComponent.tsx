import useAuth from '@/providers/AuthContext'
import useLoading from '@/providers/LoadingContext'
import { updateClientFn } from '@/services/clients'
import { removeNullObjValues } from '@/utils/utils'
import { Form, FormInstance, message } from 'antd'
import countries from 'country-data'
import React, { useRef } from 'react'
import Button from '../Button'
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
      required: false,
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
      type: 'select',
      label: 'Ocupación',
      name: 'occupation',
      required: false,
      values: ['Ingeniero', 'Periodista', 'Abogado'].map(e => ({
        value: e,
        label: e,
        icon: <></>
      }))
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
      required: false,
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
  const { user } = useAuth()
  const { setLoading } = useLoading()

  const updateUser = async () => {
    const values = await formRef.current?.validateFields()
    setLoading(true)
    await updateClientFn({
      _id: user?._id,
      ...values,
      country: countries.callingCountries.all.find(e => e.countryCallingCodes[0] === values.country)?.countryCallingCodes[0]
    })
    setLoading(false)
    message.success('Datos actualizados')
  }

  return (
    <div className="form_container">
      <div className="form_elements">
        {user && (
          <Form
            initialValues={{
              ...removeNullObjValues({
                ...user,
                country: countries.callingCountries.all.find(e => e.countryCallingCodes[0] === user.country)?.name
              }),
              ...{ document: user.document ?? '' }
            }}
            ref={formRef}
          >
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
                if (item.type === 'date') {
                  element = <DatePicker item={item} />
                }
                return <React.Fragment key={i}>{element}</React.Fragment>
              })}
            </>
          </Form>
        )}
      </div>

      <Button title="Guardar cambios" onClick={updateUser} />
    </div>
  )
}

export default FormComponent
