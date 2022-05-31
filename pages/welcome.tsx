import useReservation from '@/providers/ReservationContext'
import { ArrowRightOutlined } from '@ant-design/icons'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../components/Layout'
import useAuth from '../providers/AuthContext'

const Welcome: NextPage = () => {
  const { user } = useAuth()
  const { setStep } = useReservation()
  const router = useRouter()

  return (
    <Layout>
      <div className="main_container_welcome">
        <p className="font-Butler font-bold text-7xl">VANT</p>
        <p className="text-gold font-semibold text-xl">Te da la bienvenida</p>
        <p className="text-gold font-semibold text-2xl">{`${user?.name1} ${user?.lastName1}`}</p>
        <Link href="/reservations">
          <p className=" font-bold mt-10 border-b-4 text-xl">Comencemos !!</p>
        </Link>
      </div>
    </Layout>
  )
}

export default React.memo(Welcome)
