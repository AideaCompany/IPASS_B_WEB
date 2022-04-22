import { NextPage } from 'next'
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
        <p className="text-gold font-semibold text-2xl">{`${user.name1} ${user.lastname1}`}</p>
      </div>
    </Layout>
  )
}

export default React.memo(Welcome)
