import { NextPage } from 'next'
import Link from 'next/link'
import React, { useState } from 'react'
import Layout from '../components/Layout'
import ConfirmLogIn from '../components/Login/ConfirmLogIn'
import LoginComponent from '../components/Login/LoginComponent'
import useAuth from '../providers/AuthContext'

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
