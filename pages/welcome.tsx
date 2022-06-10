import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import Layout from '../components/Layout'
import useAuth from '../providers/AuthContext'

const Welcome: NextPage = () => {
  const { user } = useAuth()

  return (
    <Layout>
      <div className="main_container_welcome border">
        <p className="font-semibold text-xl">Bienvenido !</p>
        <p className="text-gold font-semibold text-2xl">{`${user?.name1} ${user?.lastName1}`}</p>
        <Link href="/reservations">
          <p className="Comencemos font-bold mt-10 border-b-4 text-xl">Comencemos !!</p>
        </Link>
      </div>
    </Layout>
  )
}

export default React.memo(Welcome)
