import { UserOutlined } from '@ant-design/icons'
import { ShoppingCard } from '../icons/personalIcons'
import React, { FC, useState } from 'react'
import { Badge, Drawer } from 'antd'
import useCar from '@/providers/CarContext'
import Link from 'next/link'
import CardResume from './CardResume'
import Button from './Button'
import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { car } = useCar()

  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }
  const { setStep } = useReservation()
  const onClick = () => {
    setStep(stepsPageReservation.staffers)
  }
  return (
    <>
      <div className="header  ">
        <div className="title  font-Butler font-bold text-6xl ">
          <p>VANT</p>
        </div>
        <div className="car " style={{ fontSize: '30px' }}>
          <Badge color={'#D2B782'} count={car?.services?.length}>
            <ShoppingCard style={{ fontSize: '30px' }} onClick={showDrawer} />
          </Badge>
        </div>

        <div className="profile" style={{ fontSize: '30px' }}>
          <Link href={'profile'}>
            <UserOutlined />
          </Link>
        </div>
      </div>
      <div className="container mx-auto main_container  ">{children}</div>
      <Drawer title="Contenido de la reserva XXXXXXXXX" placement="right" onClose={onClose} visible={visible}>
        <div className="Container_cardsB h-1/2  ">
          <CardResume></CardResume>
        </div>
        <div className="Container_Info_Buy   ">
          <div className="Container_TotalS   text-center "> Total de servicios</div>
          <div className="Container_SubP  divide-y divide-slate-200 font-bold ">Subtotal</div>
        </div>
        <div className="Container_Price divide-y divide-slate-200">
          <div className="Container_PR  font-helvetica text-center divide-y divide-slate-200"> Valor por reserva</div>
          <div className="Container_TP  font-bold  text-center divide-y divide-slate-200">Precio total</div>
        </div>
        <div className="Container_Info_Button h-1/6 ">
          <Button title="Confirmar reserva" onClick={onClick} customClassName="button  text-xs" />
        </div>
      </Drawer>
    </>
  )
}

export default Layout
