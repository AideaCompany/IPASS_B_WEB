import Layout from '@/components/Layout'
import ReservationsComponent from '@/components/reservations/ReservationsComponent'
import { ReservationProvider } from '@/providers/ReservationContext'
import { getAllStores } from '@/services/stores'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { GetServerSidePropsContext } from 'next'
import React from 'react'

const Reservations = ({ stores }: { stores: IStores[] }) => {
  return (
    <Layout>
      <ReservationProvider stores={stores}>
        <ReservationsComponent />
      </ReservationProvider>
    </Layout>
  )
}

export default Reservations

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const stores = await getAllStores()

  return { props: { stores } }
}
