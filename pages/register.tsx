import { FormInstance, message } from 'antd'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import Layout from '../components/Layout'
import Confirm from '../components/Register/Confirm'
import RegisterComponent from '../components/Register/RegisterComponent'
import { confirmClientFn, SignUpClientFn } from '../services/Auth'
import { registerClient, registerConfirm } from '../types/types'

const Register: NextPage = () => {
  const router = useRouter()
  const formRef = useRef<FormInstance<registerClient>>(null)
  const formRefConfirm = useRef<FormInstance<registerConfirm>>(null)
  const [isConfirm, setIsConfirm] = useState(false)
  const [data, setData] = useState<registerClient>()
  const onSubmitSignUp = async () => {
    const values = (await formRef.current?.validateFields()) as registerClient
    try {
      if (values.terms) {
        delete values.terms
        await SignUpClientFn(values)
        setData(values)
        setIsConfirm(true)
      } else {
        message.error('Debes aceptar los términos y condiciones para continuar')
      }
    } catch (error) {
      console.log(error)
    } finally {
    }
  }
  const onConfirmSignUp = async () => {
    const values = (await formRefConfirm.current?.validateFields()) as registerConfirm
    message.success('Registro exitoso')
    try {
      await confirmClientFn(values.token)
    } catch (error) {
      console.log(error)
    } finally {
    }
  }
  return (
    <Layout>
      <div className="main_container_register">
        <p className="font-Butler font-medium text-2xl">Registro</p>
        {isConfirm ? (
          <Confirm formRef={formRefConfirm} onConfirmSignUp={onConfirmSignUp} data={data as registerClient} />
        ) : (
          <RegisterComponent formRef={formRef} onSubmitSignUp={onSubmitSignUp} />
        )}
      </div>
    </Layout>
  )
}

export default Register
