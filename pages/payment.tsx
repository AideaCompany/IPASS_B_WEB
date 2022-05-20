import { Form } from 'antd'
import { NextPage } from 'next'
import React from 'react'
import Input from '../components/Input'
import Layout from '../components/Layout'

const Register: NextPage = () => {
  return (
    <Layout>
      <div className="main_container_payment ">
        <p className="container_logo  font-Butler font-medium text-7xl m-0">VANT</p>
        <p className="container_description text-gold font-semibold text-xl">Bienvenido al portal de pagos</p>
        <div className="container_pay  m-0">
          <div className="container_form flex flex-col  m-0">
            <Form className="dates ">
              <p className="font-Gothic text-black">Confirma la dirección de entrega y tu medio de pago</p>
              <Input placeHolder="Celular" type="number" name="phone1" />
              <Input placeHolder="Correo Electrónico" type="email" name="email" />
              <Input placeHolder="Dirección" name="adress" />
            </Form>
          </div>
          <div className="container_card flex flex-col m-0  ">
            <div className="card  ">
              <div className="card-inner">
                <div className="front">
                  <img src="/images/map.png" className="map-img"></img>
                  <div className="row">
                    <img src="/images/chip.png" width={30}></img>
                    <img src="/images/visa.png" width={30}></img>
                  </div>
                  <div className="row card_number">
                    <p>5244</p>
                    <p>5244</p>
                    <p>5244</p>
                    <p>5244</p>
                  </div>
                  <div className="row card_holder">
                    <p>CARD HOLDER</p>
                    <p>VALID TILL</p>
                  </div>
                  <div className="row name">
                    <p>JUAN CAICEDO</p>
                    <p>11/28</p>
                  </div>
                </div>
                <div className="back">
                  <img src="/images/map.png" className="map-img"></img>
                  <div className="bar"></div>
                  <div className="row card_cvv">
                    <div>
                      <img src="/images/pattern.png"></img>
                    </div>
                    <p>824</p>
                  </div>
                </div>
              </div>
            </div>
            <button className="w-3/4 flex flex-col justify-center items-center text-3xl font-bold text-indigo-400 border-2 border-gold rounded-2xl border-dashed cursor-pointer transition duration-200 hover:shadow-2xl pb-10 m-5">
              <div>+</div>
              <div>Nueva tarjeta</div>
            </button>
          </div>
        </div>
        <div className="container_cards m-0">
          <div className="container_form flex flex-col  m-0">
            <Form className="dates ">
              <p className="font-Gothic text-black">Información de tu tarjeta</p>
              <Input placeHolder="Número de tarjeta " name="number" />
              <Input placeHolder="Nombre" name="name1" />
              <Input placeHolder="Apellido" name="lastName1" />
              <Input placeHolder="ID" type="number" name="ID" />
              <Input placeHolder="Fecha de expiración" name="Expired" />
              <Input placeHolder="CVV" name="CVV" />
            </Form>
          </div>
          <div className="container_card flex flex-col m-0  ">
            <div className="card  ">
              <div className="card-inner">
                <div className="front">
                  <img src="/images/map.png" className="map-img"></img>
                  <div className="row">
                    <img src="/images/chip.png" width={60}></img>
                    <img src="/images/visa.png" width={60}></img>
                  </div>
                  <div className="row card_number">
                    <p>5244</p>
                    <p>5244</p>
                    <p>5244</p>
                    <p>5244</p>
                  </div>
                  <div className="row card_holder">
                    <p>CARD HOLDER</p>
                    <p>VALID TILL</p>
                  </div>
                  <div className="row name">
                    <p>------</p>
                    <p>--/--</p>
                  </div>
                </div>
                <div className="back">
                  <img src="/images/map.png" className="map-img"></img>
                  <div className="bar"></div>
                  <div className="row card_cvv">
                    <div>
                      <img src="/images/pattern.png"></img>
                    </div>
                    <p>824</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Register
