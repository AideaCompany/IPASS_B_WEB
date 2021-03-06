import { NextPage } from 'next'
import Link from 'next/link'
import React, { useState } from 'react'
import Layout from '../components/Layout'
import ConfirmLogIn from '../components/Login/ConfirmLogIn'
import LoginComponent from '../components/Login/LoginComponent'

const Login: NextPage = () => {
  const [data, setData] = useState({} as any)

  const [isConfirm, setIsConfirm] = useState(false)

  return (
    <Layout>
      <div className="main_container_login">
        <p className="font-Butler font-medium text-2xl">Iniciar Sesión</p>
        {!isConfirm && (
          <p className="font-Gothic">
            Si no tienes una cuenta puedes
            <br />
            <Link href="/register">
              <a className="Register_link text-gold w-full  hover:underline">¡Registrarte acá!</a>
            </Link>
          </p>
        )}
        {isConfirm ? <ConfirmLogIn data={data} /> : <LoginComponent setIsConfirm={setIsConfirm} setData={setData} />}
      </div>
    </Layout>
  )
}

export default Login
