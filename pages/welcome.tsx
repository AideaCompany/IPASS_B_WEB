import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import Layout from '../components/Layout'
import useAuth from '../providers/AuthContext'

const Welcome: NextPage = () => {
  const { user } = useAuth()

  return (
    <Layout>
      <div className="main_container_welcome">
        <p className="font-Butler font-bold text-7xl">VANT</p>
        <p className="text-gold font-semibold text-xl">Te da la bienvenida</p>
        <p className="text-gold font-semibold text-2xl">{`${user?.name1} ${user?.lastName1}`}</p>
        <Link href="/reservations">
          <p className="Comencemos font-bold mt-10 border-b-4 text-xl">Comencemos !!</p>
        </Link>
      </div>
    </Layout>
  )
}

export default React.memo(Welcome)
