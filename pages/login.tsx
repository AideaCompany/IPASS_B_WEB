import useAuth from '../providers/AuthContext'
import { Form, FormInstance } from 'antd'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import InputPassword from '../components/InputPassword'
import Layout from '../components/Layout'
import { gql, useMutation } from '@apollo/client'
import { loginWebFn } from '../services/session'
import Selector from '../components/Selector'
import countries from 'country-data'
import { sendCodeFn } from '../services/clients'
import LoginComponent from '../components/Login/LoginComponent'
import ConfirmLogIn from '../components/Login/ConfirmLogIn'

const Login: NextPage = () => {
  // const [loginTrigger] = useMutation(gql(mutation.loginApp))
  const [data, setData] = useState({} as any)
  const { login } = useAuth()

  const [isConfirm, setIsConfirm] = useState(false)

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
        {isConfirm ? <ConfirmLogIn data={data} /> : <LoginComponent setIsConfirm={setIsConfirm} setData={setData} />}
      </div>
    </Layout>
  )
}

export default Login
