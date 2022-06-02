import Layout from '@/components/Layout'
import { stepsPageReservation } from '@/providers/ReservationContext'
import ReservationsComponent from '@/components/reservations/ReservationsComponent'
import { ReservationProvider } from '@/providers/ReservationContext'
import { getAllStores } from '@/services/stores'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { GetServerSidePropsContext } from 'next'
import React from 'react'

const Reservations = ({ stores, currentStep }: { stores: IStores[]; currentStep: stepsPageReservation }) => {
  return (
    <Layout>
      <ReservationProvider currentStep={currentStep} stores={stores}>
        <ReservationsComponent />
      </ReservationProvider>
    </Layout>
  )
}

export default Reservations

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const stores = await getAllStores()
  const currentStep = ctx.query.step ?? stepsPageReservation.Genere
  return { props: { stores, currentStep } }
}
