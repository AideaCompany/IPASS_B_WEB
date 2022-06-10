import useCar from '@/providers/CarContext'
import { stepsPageReservation } from '@/providers/ReservationContext'
import { IService } from '@/types/interfaces/services/Services.interface'
import { IShoppingService } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import { Badge, Drawer } from 'antd'
import { ShoppingCard } from 'icons/personalIcons'
import { useRouter } from 'next/router'
import numeral from 'numeral'
import React, { useState } from 'react'
import Button from '../Button'
import CardResume from '../CardResume'

const CarDrawer = () => {
  const [visible, setVisible] = useState(false)
  const onClose = () => {
    setVisible(false)
  }
  const onClick = () => {
    router.push(`/reservations?step=${stepsPageReservation.selectDate}`)
  }
  const { car } = useCar()
  const router = useRouter()

  const price = (car?.services as IShoppingService[])?.map(e => (e.service as IService)?.price)?.reduce((a, b) => a + b)

  return (
    <>
      <div className="car " style={{ fontSize: '30px' }}>
        <Badge color={'#D2B782'} count={car?.services?.length}>
          <ShoppingCard style={{ fontSize: '30px' }} onClick={() => setVisible(true)} />
        </Badge>
      </div>
      <Drawer title={car ? 'Contenido de la reserva XXXXXXXXX' : 'Carrito vació'} placement="right" onClose={onClose} visible={visible}>
        {car && (
          <>
            <div className="Container_cardsB h-1/2  ">
              {car?.services?.map((service, i) => (
                <React.Fragment key={i}>
                  <CardResume service={service} />
                </React.Fragment>
              ))}
            </div>
            <div className="Container_Info_Buy ">
              <div className="Titles_Buy font-helvetica text-right divide-y divide-gray-300">
                <p>Total de servicios:</p>
                <p>Valor de la reserva:</p>
                <p>Precio servicios:</p>
              </div>
              <div className="Container_Price divide-y divide-blue-200">
                <p>{`${car?.services?.length}`}</p>
                <p>{`Q${numeral(price * 0.15).format('0,0')}`}</p>
                <p>{`Q${numeral(price).format('0,0')}`}</p>
              </div>
            </div>

            <div className="Container_Info_Button h-1/6 ">
              <Button title="Confirmar reserva" onClick={onClick} customClassName="button  text-xs" />
            </div>
          </>
        )}
      </Drawer>
    </>
  )
}

export default CarDrawer
