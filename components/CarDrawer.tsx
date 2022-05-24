import useCar from '@/providers/CarContext'
import { Badge, Drawer } from 'antd'
import { ShoppingCard } from 'icons/personalIcons'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Button from './Button'
import CardResume from './CardResume'

const CarDrawer = () => {
  const [visible, setVisible] = useState(false)
  const onClose = () => {
    setVisible(false)
  }
  const onClick = () => {
    router.push('/reservations')
  }
  const { car } = useCar()
  const router = useRouter()
  return (
    <>
      <div className="car " style={{ fontSize: '30px' }}>
        <Badge color={'#D2B782'} count={car?.services?.length}>
          <ShoppingCard style={{ fontSize: '30px' }} onClick={() => setVisible(true)} />
        </Badge>
      </div>
      <Drawer title="Contenido de la reserva XXXXXXXXX" placement="right" onClose={onClose} visible={visible}>
        <div className="Container_cardsB h-1/2  ">
          <CardResume />
        </div>
        <div className="Container_Info_Buy   ">
          <div className="Container_TotalS   text-center "> Total de servicios: </div>
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

export default CarDrawer
