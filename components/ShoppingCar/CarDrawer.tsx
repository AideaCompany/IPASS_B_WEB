import useCar from '@/providers/CarContext'
import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import { IService } from '@/types/interfaces/services/Services.interface'
import { IShoppingService, statusShoppingCard } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Badge, Drawer, Tooltip } from 'antd'
import { ShoppingCard } from 'icons/personalIcons'
import { useRouter } from 'next/router'
import numeral from 'numeral'
import React, { useState } from 'react'
import Button from '../Button'
import CardResume from '../CardResume'

const CarDrawer = () => {
  const [visible, setVisible] = useState(false)
  const { car } = useCar()
  const router = useRouter()
  const reservation = useReservation()

  const onClose = () => {
    setVisible(false)
  }
  const onClick = () => {
    if (car?.status !== statusShoppingCard.WAITING_PAYMENT && reservation.setStep) {
      reservation.setStep(stepsPageReservation.selectDate)
      setVisible(false)
    }
    router.push(car?.status === statusShoppingCard.WAITING_PAYMENT ? `/payment` : `/reservations?step=${stepsPageReservation.selectDate}`)
  }

  const price = (car?.services as IShoppingService[])?.map(e => (e.service as IService)?.price)?.reduce((a, b) => a + b)

  return (
    <>
      <div className="car " style={{ fontSize: '30px' }}>
        <Badge color={'#D2B782'} count={car?.services?.length}>
          <ShoppingCard style={{ fontSize: '30px' }} onClick={() => setVisible(true)} />
        </Badge>
      </div>
      <Drawer title={car ? 'Contenido de la reserva ' : 'Carrito vació'} placement="right" onClose={onClose} visible={visible}>
        {car && (
          <>
            <div className="Container_cardsB h-1/2  ">
              {car?.services?.map((service, i) => (
                <React.Fragment key={i}>
                  <CardResume service={service} />
                </React.Fragment>
              ))}
            </div>
            <div className="Container_Info_Buy  pt-32">
              <div className="Titles_Buy font-helvetica pl-0 text-left divide-y divide-gray-300 flex flex-col space-y-2">
                <p>Total de servicios:</p>
                <div className="flex space-x-4 pt-0">
                  <p>Valor de la reserva:</p>
                  <div className=" pt-0">
                    <Tooltip title="Este valor se cobrará unicamente si no se asiste o no se re programa la reserva">
                      <QuestionCircleOutlined style={{ fontSize: '15px' }} />
                    </Tooltip>
                  </div>
                </div>
                <p>Precio servicios:</p>
                <p>Tiempo estimado:</p>
              </div>
              <div className="Container_Price divide-y text-right divide-blue-200 flex flex-col space-y-2">
                <p>{`${car?.services?.length}`}</p>
                <p>{`Q${numeral(price * 0.15).format('0,0')}`}</p>
                <p>{`Q${numeral(price).format('0,0')}`}</p>
                <p>{`${car?.services.map(e => (e.service as IService).serviceTime).reduce((a, b) => a + b)} min`}</p>
              </div>
            </div>

            <div className="Container_Info_Button h-1/6 ">
              <Button
                title={car.status === statusShoppingCard.WAITING_PAYMENT ? 'Ir a pagar' : 'Confirmar reserva'}
                onClick={onClick}
                customClassName="button  text-xs"
              />
            </div>
          </>
        )}
      </Drawer>
    </>
  )
}

export default CarDrawer
