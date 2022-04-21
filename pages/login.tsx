import { Form } from 'antd'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import InputPassword from '../components/InputPassword'
import Layout from '../components/Layout'
const Login: NextPage = () => {
  const router = useRouter()

  return (
    <Layout>
      <div className="main_container_login">
        <p className="font-Butler font-medium text-2xl">Iniciar Sesión</p>
        <p className="font-Gothic">
          Si no tienes una cuenta <br />
          puedes
          <Link href="/register">
            <a className="text-gold hover:underline">¡Registrarte acá!</a>
          </Link>
        </p>
        <div className="container_form">
          <Form>
            <div>
              <Input placeHolder="Celular" name="phone" />
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
          <Button title="Iniciar sesión" isGold={true} onClick={() => router.push('register')} />
        </div>
      </div>
    </Layout>
  )
}

export default Login
