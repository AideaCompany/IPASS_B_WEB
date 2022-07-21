import Button from '@/components/Button'
import CardResume from '@/components/CardResume'
import Checkbox from '@/components/Checkbox'
import ModalCard from '@/components/ModalCard'
import CardTable from '@/components/Payment/CardTable'
import PaymentMinutes from '@/components/Payment/PaymentMinutes'
import useAuth from '@/providers/AuthContext'
import useCar from '@/providers/CarContext'
import { stepsPageReservation } from '@/providers/ReservationContext'
import { generateTransferSessionToWebFn, listClientCardsFn } from '@/services/clients'
import { makePaymentShoppingCardFn } from '@/services/shoppingCar'
import { StatusPayment } from '@/types/interfaces/Payments/Payment.interface'
import { IService } from '@/types/interfaces/services/Services.interface'
import { IShoppingService } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { ICards, IClient } from '@/types/types'
import { decodeValues, encryptValues } from '@/utils/utils'
import { Form, FormInstance, message } from 'antd'
import { $security } from 'config'
import * as cookie from 'cookie'
import jwt from 'jsonwebtoken'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import numeral from 'numeral'
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout'

const Register = ({ cards }: { cards: ICards[] }) => {
  const [currentCards, setCurrentCards] = useState(cards)
  const { user } = useAuth()
  // const [car, setCar] = useState<IShoppingCard>()
  const { car, getData: getDataCar } = useCar()
  const [selectedCard, setSelectedCard] = useState<ICards | null>(cards.length ? cards[0] : null)
  const router = useRouter()
  const formCheckbox = useRef<FormInstance>(null)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  // useEffect(() => {
  //   if (user) {
  //     getData()
  //   }
  // }, [user])

  // const getData = async () => {
  //   const value = await getClientCurrentShoppingCardToPayFn(user?._id as string)
  //   setCar(value)
  // }

  const updateCards = async () => {
    const newCards = await listClientCardsFn(user?._id as string)
    setCurrentCards(decodeValues(newCards))
  }

  const onClick = async () => {
    const resp = await makePaymentShoppingCardFn(user?._id as string, encryptValues(selectedCard as ICards))
    if (resp.status === StatusPayment.ACCEPTED) {
      message.success('Pago realizado con éxito')
      getDataCar()
      router.push({ pathname: '/reserve/[id]', query: { id: car?._id } })
    } else {
      message.error('Ocurrió un error inténtalo mas tarde')
    }
  }

  const price = (car?.services as IShoppingService[])?.map(e => (e.service as IService)?.price).reduce((a, b) => a + b)

  const validateDisable = async () => {
    if (formCheckbox.current) {
      const { terms, medical } = await formCheckbox.current?.validateFields()
      if (!terms || !medical) {
        setButtonDisabled(true)
      } else {
        if (selectedCard) {
          setButtonDisabled(false)
        } else {
          setButtonDisabled(true)
        }
      }
    } else {
      setButtonDisabled(true)
    }
  }

  useEffect(() => {
    validateDisable()
  }, [setSelectedCard])
  const percentage = (car?.services[0].store as IStores)?.reservePercentage
  return (
    <Layout>
      <div className="main_container_payment">
        <p className="container_description text-left  font-semibold text-base">{`${user?.name1} tu reserva`}</p>
        <div className="Main_Payment">
          <div className="Container_CardResume">
            <div className="Container_cardsB h-3/4">
              {car?.services?.map((service, i) => (
                <React.Fragment key={i}>
                  <CardResume service={service} />
                </React.Fragment>
              ))}
            </div>
            <div className="container_terms">
              <div className="info_terms">
                <p>{`Cantidad de servicios:  ${car?.services?.length}`}</p>
              </div>

              <Form
                onChange={validateDisable}
                initialValues={{ terms: false, medical: false }}
                className="checkbox_container flex"
                ref={formCheckbox}
              >
                <Checkbox name="terms" label="Acepto términos y condiciones" />
                <Checkbox name="medical" label="Acepto Disclaimer Médico" />
              </Form>
            </div>
          </div>
          <div className="Container_Info_Card ">
            <CardTable setSelectedCard={setSelectedCard} selectedCard={selectedCard} cards={currentCards} onComplete={updateCards} />
            <ModalCard onComplete={updateCards} />
            <div className="Container_Info_Buy ">
              <div className="Titles_Buy font-helvetica text-left">
                <p>Precio servicios del ticket:</p>
                <p>Tiempo de reserva:</p>
              </div>
              <div className="Container_Price text-right font-bold ">
                <p>{`Q${numeral(price).format('0,0')}`}</p>
                <p>{` ${car?.services.map(e => (e.service as IService).serviceTime).reduce((a, b) => a + b)} min`}</p>
              </div>
            </div>
            <div className="Container_Info_Buy ">
              <div className="Titles_Buy font-helvetica text-left">
                <p>{`Precio de reserva (${percentage}%):`}</p>
              </div>
              <div className="Container_Price text-right font-bold ">
                <p>{`Q${numeral((price * percentage) / 100).format('0,0')}`}</p>
              </div>
            </div>
            <strong>
              <p>{`*Este monto corresponde al ${percentage}% del valor del ticket que se descuenta del monto total `}</p>
            </strong>

            {car && <PaymentMinutes car={car} />}
            <Button disabled={buttonDisabled} title="COMPLETAR PAGO" onClick={onClick} customClassName="button  text-xs"></Button>
          </div>
        </div>
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
  } else if (ctx.query.session) {
    const session = await generateTransferSessionToWebFn(ctx.query.session as string)
    if (!session || session === '') {
      return {
        notFound: true
      }
    }
    ctx.res.setHeader('set-cookie', [`authIpassClient=${session}`])
    const { data } = jwt.verify(session, $security.secretKey) as { data: IClient }
    const cards = await listClientCardsFn(data._id as string)
    const currentStep = ctx.query.step ?? stepsPageReservation.Genere
    return { props: { cards: decodeValues(cards), currentStep } }
  } else {
    return {
      notFound: true
    }
  }
}
