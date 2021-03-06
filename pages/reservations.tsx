import Layout from '@/components/Layout'
import ReservationsComponent from '@/components/reservations/ReservationsComponent'
import { ReservationProvider, stepsPageReservation } from '@/providers/ReservationContext'
import { GetServerSidePropsContext } from 'next'
import React from 'react'

const Reservations = ({ currentStep }: { currentStep: stepsPageReservation }) => {
  return (
    <ReservationProvider currentStep={currentStep}>
      <Layout>
        <ReservationsComponent />
      </Layout>
    </ReservationProvider>
  )
}

export default Reservations

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const currentStep = ctx.query.step ?? stepsPageReservation.Genere
  return { props: { currentStep } }
}
