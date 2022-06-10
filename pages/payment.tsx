import Button from '@/components/Button'
import CardResume from '@/components/CardResume'
import Checkbox from '@/components/Checkbox'
import ModalCard from '@/components/ModalCard'
import CardTable from '@/components/Payment/CardTable'
import useAuth from '@/providers/AuthContext'
import useCar from '@/providers/CarContext'
import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import { listClientCardsFn } from '@/services/clients'
import { getClientCurrentShoppingCardToPayFn, InvalidateShoppingCardFn } from '@/services/shoppingCar'
import { IService } from '@/types/interfaces/services/Services.interface'
import { IShoppingCard, IShoppingService } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import { ICards, IClient } from '@/types/types'
import { decodeValues } from '@/utils/utils'
import { $security } from 'config'
import * as cookie from 'cookie'
import jwt from 'jsonwebtoken'
import moment from 'moment-timezone'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import numeral from 'numeral'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
let myInterval: any
const Register = ({ cards }: { cards: ICards[] }) => {
  const { setStep } = useReservation()
  const [currentCards, setCurrentCards] = useState(cards)
  const { user } = useAuth()
  const [car, setCar] = useState<IShoppingCard>()
  const { getData: getDataCar } = useCar()
  const [minutes, setMinutes] = useState('')
  const router = useRouter()
  useEffect(() => {
    if (user) {
      getData()
    }
  }, [user])

  const getData = async () => {
    const value = await getClientCurrentShoppingCardToPayFn(user?._id as string)
    setCar(value)
  }

  useEffect(() => {
    ;(async () => {
      if (car) {
        let diff = moment.tz(car?.timeToPay, 'America/Guatemala').diff(moment.tz('America/Guatemala'), 'minutes', true)
        let segs = diff % 1
        let minutes = Math.trunc(diff)

        if (diff <= 10 && diff >= 0) {
          myInterval = setInterval(async () => {
            diff = moment.tz(car?.timeToPay, 'America/Guatemala').diff(moment.tz('America/Guatemala'), 'minutes', true)
            segs = diff % 1
            minutes = Math.trunc(diff)
            if (diff < 0) {
              clearInterval(myInterval)
              await InvalidateShoppingCardFn(user?._id as string)
              getDataCar()
              router.push(`/reservations?step=${stepsPageReservation.selectDate}`)
            }
            setMinutes(`${minutes}:${numeral(segs * 60).format('00')}`)
          }, 1000)
        } else {
          clearInterval(myInterval)
          await InvalidateShoppingCardFn(user?._id as string)
          getDataCar()
          router.push(`/reservations?step=${stepsPageReservation.selectDate}`)
        }
      }
    })()
    return () => {
      clearInterval(myInterval)
    }
  }, [car])

  const updateCards = async () => {
    const newCards = await listClientCardsFn(user?._id as string)
    setCurrentCards(decodeValues(newCards))
  }

  const onClick = () => {
    setStep(stepsPageReservation.staffers)
  }

  const price = (car?.services as IShoppingService[])?.map(e => (e.service as IService)?.price).reduce((a, b) => a + b)

  return (
    <Layout>
      <div className="main_container_payment ">
        <p className="container_description text-left  font-semibold text-base">Juan Perez tu número de reserva es #123345</p>
        <div className="Main_Payment ">
          <div className="Container_CardResume ">
            <div className="Container_cardsB h-3/4  ">
              {car?.services?.map((service, i) => (
                <React.Fragment key={i}>
                  <CardResume service={service} />
                </React.Fragment>
              ))}
            </div>
            <div className="Container_termins h-1/4 text-stone-400 text-xs  ">
              <p>{`Cantidad de servicios:  ${car?.services?.length}`}</p>
              <p>{`Seras atendido por:  ${car?.services?.length}`}</p>
              <div className="Container_termins flex mt-10">
                <Checkbox name="Oferta" label="Acepto términos y condiciones" />
                <Checkbox name="Oferta" label="Acepto Disclaimer Médico" />
              </div>
            </div>
          </div>
          <div className="Container_Info_Card ">
            <CardTable cards={currentCards} onComplete={updateCards} />
            <ModalCard onComplete={updateCards} />
            <div className="Container_Offerts  pt-4 font-semibold ">
              <Checkbox name="Oferta" label="5% de descuento por ser la primera reserva" />
            </div>
            <div className="Container_OffertsC  flex pt-4 font-semibold ">
              <div className="Medium w-2/3  h-12 aling-botton">
                <input type="text" className="appearance-none bg-transparent w-full h-12  " placeholder="Ingresar código de descuento"></input>
              </div>
              <div className="Medium2 w-1/3  m-0 h-8 aling-botton">
                <Button title="Aceptar" onClick={onClick} customClassName="b1 h-8 m-0 text-xs "></Button>
              </div>
            </div>
            <div className="Container_Info_Buy ">
              <div className="Titles_Buy font-helvetica text-left">
                <p> Valor de la reserva:</p>
                <p>Precio Total:</p>
                <p>Subtotal:</p>
              </div>
              <div className="Container_Price text-right font-bold ">
                <p>{`Q${numeral(price * 0.15).format('0,0')}`}</p>
                <p>{`Q${numeral(price * 1.15).format('0,0')}`}</p>
                <p>{`Q${numeral(price).format('0,0')}`}</p>
              </div>
            </div>
            <div className="Titles_Buy font-helvetica text-center font-bold m-6">
              <p>{`Tienes ${minutes ?? '00:00'} minutos para realizar el pago`}</p>
            </div>
            <Button title="PAGAR EN LA SEDE" onClick={onClick} customClassName="button  bg-indigo-500 w-20 text-xs"></Button>
            <Button title="COMPLETAR PAGO" onClick={onClick} customClassName="button  text-xs"></Button>
          </div>
        </div>
        <div className="container_pay  m-0"></div>
      </div>
    </Layout>
  )
}

export default Register
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const token = ctx?.req?.headers?.cookie
  if (token) {
    if (cookie.parse(token).authIpassClient) {
      const { data } = jwt.verify(cookie.parse(token).authIpassClient, $security.secretKey) as { data: IClient }
      const cards = await listClientCardsFn(data._id as string)
      const currentStep = ctx.query.step ?? stepsPageReservation.Genere
      return { props: { cards: decodeValues(cards), currentStep } }
    }
  } else {
    return {
      notFound: true
    }
  }
}
