import useAuth from '../providers/AuthContext'
import { Form, FormInstance } from 'antd'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import InputPassword from '../components/InputPassword'
import Layout from '../components/Layout'
import { gql, useMutation } from '@apollo/client'
import { loginWebFn } from '../services/session'

const Login: NextPage = () => {
  const router = useRouter()
  // const [loginTrigger] = useMutation(gql(mutation.loginApp))

  const { login } = useAuth()
  const formRef = useRef<FormInstance>(null)

  const loginForm = async () => {
    const { phone1, password }: { phone1: string; password: string } = await formRef.current?.validateFields()
    try {
      const data = await loginWebFn({ phone1, password })
      login(data.token)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <div className="main_container_login">
        <p className="font-Butler font-medium text-2xl">Iniciar Sesión</p>
        <p className="font-Gothic">
          Si no tienes una cuenta puedes
          <br />
          <Link href="/register">
            <a className="text-gold hover:underline">¡Registrarte acá!</a>
          </Link>
        </p>
        <div className="container_form">
          <Form onFinish={loginForm} ref={formRef}>
            <div>
              <Input placeHolder="Celular" name="phone1" />
              <InputPassword />
            </div>
            <div className="text-right">
              <Link href="/register">
                <a className="text-black hover:underline">Olvide mi contraseña</a>
              </Link>
            </div>
          </Form>
        </div>

        <div className="container_buttons">
          <Button title="Iniciar sesión" isGold={true} onClick={loginForm} />
        </div>
      </div>
    </Layout>
  )
}

export default Login
