import useCar from '@/providers/CarContext'
import { stepsPageReservation } from '@/providers/ReservationContext'
import { IService } from '@/types/interfaces/services/Services.interface'
import { IShoppingService } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import { Badge, Drawer } from 'antd'
import { ShoppingCard } from 'icons/personalIcons'
import { useRouter } from 'next/router'
import numeral from 'numeral'
import React, { useState } from 'react'
import Button from './Button'
import CardResume from './CardResume'

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

  const price = (car?.services as IShoppingService[])?.map(e => (e.service as IService)?.price).reduce((a, b) => a + b)

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
            <div className="Container_Info_Buy   ">
              <div className="Container_TotalS   text-center "> {`Total de servicios: ${car?.services?.length}`}</div>
              <div className="Container_SubP  divide-y divide-slate-200 font-bold ">{`Subtotal: Q${numeral(price).format('0,0')}`}</div>
            </div>
            <div className="Container_Price divide-y divide-slate-200">
              <div className="Container_PR  font-helvetica text-center divide-y divide-slate-200">
                {`Valor por reserva Q${numeral(price * 0.15).format('0,0')}`}
              </div>
              <div className="Container_TP  font-bold  text-center divide-y divide-slate-200">{`Precio total : Q${numeral(price * 1.15).format(
                '0,0'
              )}`}</div>
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
