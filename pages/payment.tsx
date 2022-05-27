import Button from '@/components/Button'
import CardResume from '@/components/CardResume'
import Checkbox from '@/components/Checkbox'
import useCar from '@/providers/CarContext'
import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import { IService } from '@/types/interfaces/services/Services.interface'
import { IShoppingService } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import { CheckCircleOutlined, CreditCardOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, Modal } from 'antd'
import { NextPage } from 'next'
import numeral from 'numeral'
import React, { useState } from 'react'
import Input from '../components/Input'
import Layout from '../components/Layout'

const Register: NextPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const { car } = useCar()
  const { setStep } = useReservation()
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
                <Checkbox name="Oferta" label="Acepto terminos y condiciones" />
                <Checkbox name="Oferta" label="Acepto Disclaimer Médico" />
              </div>
            </div>
          </div>
          <div className="Container_Info_Card ">
            <div className="title flex space-x-2 p-1">
              <CreditCardOutlined style={{ fontSize: '20px' }} />
              <p className=" text-left font-semibold text-base flex space-x-4">Tarjetas Registradas</p>
            </div>
            <div className="Info_T_Cards_preview flex space-x-8 p-1 font-semibold ">
              <CheckCircleOutlined style={{ fontSize: '20px', color: '#1BB66E' }} />
              <p>Titular</p>
              <p># Tarjeta</p>
              <p>Fecha exp</p>
              <p>Banco</p>
            </div>
            <div className="Info_Cards_preview flex space-x-12 p-1 font-bold font-semibold ">
              <CreditCardOutlined style={{ fontSize: '15px' }} />
              <p>Perez</p>
              <p>5678</p>
              <p>15/20</p>
              <p>Guate</p>
            </div>
            <div className="New_form_Pay flex space-x-36 p-2 pl-4 font-semibold ">
              <Button title="Agregar Metodo de Pago       +" onClick={showModal} customClassName="button  bg-indigo-500 w-20 text-xs"></Button>
            </div>

            <Modal title="Información de tu tarjeta " visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <Form className="dates h-96 mb-0 mt-0 flex flex-col space-y-1">
                <p className="font-Gothic text-black">Por favor ingresa los siguientes datos</p>
                <Input placeHolder="Número de tarjeta " name="number" />
                <Input placeHolder="Nombre" name="name1" />
                <Input placeHolder="Apellido" name="lastName1" />

                <Input placeHolder="Fecha de expiración" name="Expired" />
                <Input placeHolder="CVV" name="CVV" />
                <Input placeHolder="ID" type="number" name="ID" />
              </Form>
            </Modal>
            <div className="Container_Offerts  pt-4 font-semibold ">
              <Checkbox name="Oferta" label="5% de descuento por ser la primera reserva" />
            </div>
            <div className="Container_OffertsC  flex pt-4 font-semibold ">
              <input type="text" className="appearance-none bg-transparent w-2/3 px-4 py-2 " placeholder="Ingresar código de descuento"></input>
              <Button title="Aceptar" onClick={onClick} customClassName="button1 w-92 text-xs "></Button>
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
              <p>Tienes 9:32 minutos para realizar el pago</p>
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
