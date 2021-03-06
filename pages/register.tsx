import { FormInstance, message } from 'antd'
import { NextPage } from 'next'
import React, { useRef, useState } from 'react'
import Layout from '../components/Layout'
import Confirm from '../components/Register/Confirm'
import RegisterComponent from '../components/Register/RegisterComponent'
import useAuth from '../providers/AuthContext'
import { confirmClientFn, SignUpClientFn } from '../services/Auth'
import { registerClient, registerConfirm } from '../types/types'

const Register: NextPage = () => {
  const formRef = useRef<FormInstance<registerClient>>(null)
  const formRefConfirm = useRef<FormInstance<registerConfirm>>(null)
  const [isConfirm, setIsConfirm] = useState(false)
  const [data, setData] = useState<registerClient>()
  const { login } = useAuth()
  const onSubmitSignUp = async () => {
    const values = (await formRef.current?.validateFields()) as registerClient
    try {
      if (values.terms) {
        delete values.terms
        await SignUpClientFn(values)
        setData(values)
        setIsConfirm(true)
        message.info({
          content: 'Hemos enviado un código a tu correo',
          duration: 10,
          style: {
            marginTop: '15vh'
          }
        })
      } else {
        message.error({
          content: 'Debes aceptar los términos y condiciones para continuar',
          duration: 10,
          style: {
            marginTop: '20vh'
          }
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
    }
  }
  const onConfirmSignUp = async () => {
    const values = (await formRefConfirm.current?.validateFields()) as registerConfirm
    try {
      const res = await confirmClientFn(values.token)
      message.success({
        content: 'Inició de sesión exitoso',
        duration: 10,
        style: {
          marginTop: '20vh'
        }
      })
      if (res.response === '200') {
        login(res.token)
      }
    } catch (error) {
      console.log(error)
    } finally {
    }
  }
  return (
    <Layout>
      <div className="main_container_register ">
        <p className="font-Butler font-medium mt-10 text-2xl">Registro</p>
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
