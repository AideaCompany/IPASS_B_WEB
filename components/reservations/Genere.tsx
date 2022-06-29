import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import { generes } from '@/types/interfaces/Stores/stores.interface'
import React, { useEffect, useState } from 'react'
import moment from 'moment-timezone'
import Button from '../Button'
import { IShoppingCard } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import { List } from 'antd'
import useAuth from '@/providers/AuthContext'
import { getClientShoppingCardsFn } from '@/services/shoppingCar'
import CardHistory from '../history/CardHistory'

const Genere = () => {
  const { setStep, setGenere } = useReservation()
  const onClick = (paramGenere: string) => {
    setStep(stepsPageReservation.store)
    setGenere(paramGenere)
  }

  const { user } = useAuth()
  const [history, setHistory] = useState<IShoppingCard[]>([])
  useEffect(() => {
    if (user) {
      getData()
    }
  }, [user])

  const getData = async () => {
    const data = await getClientShoppingCardsFn(user?._id as string)
    setHistory(data)
  }
  return (
    <div className="Container_Genere  w-full pt-4">
      <p className="Title font-Gothic text-right pt-4 ">Selección de genero</p>
      <p className="Title font-Gothic text-center text-sm font-bold mt-8 ">Selecciona el tipo de servicio </p>

      <div className="Container_Tar w-full grid grid-cols-2 gap-x-6 gap-y-6 mt-16 h-auto p-20 ">
        <div className="Container_GEN  cursor-pointer  relative  justify-self-center  ml-10" onClick={() => onClick(generes.MEN)}>
          <img src="/images/Caballeros.png" className="mapG-img  relative justify-self-center "></img>
          <div className="Gradient justify-self-center"></div>

          <p className="Title font-Gothic  font-bold text-2xl text-white absolute bottom-0 left-24 top-24 "> Caballeros</p>
        </div>
        <div className="Container_GEN    cursor-pointer relative justify-self-center ml-20 " onClick={() => onClick(generes.WOMEN)}>
          <img src="/images/Damas.png" className="mapG-img h-60 relative"></img>
          <p className="Title font-Gothic text-right font-bold text-2xl text-white absolute bottom-0 left-24 top-24"> Damas</p>
        </div>
        <div className="Container_GEN   cursor-pointer relative justify-self-center ml-10" onClick={() => onClick(generes.CHILDREN)}>
          <img src="/images/Niños.png" className="mapG-img h-60 relative"></img>
          <p className="Title font-Gothic text-right font-bold text-2xl text-white absolute bottom-0 left-20 top-24 "> Niños y Niñas</p>
        </div>
        <div className="Container_GEN   cursor-pointer relative justify-self-center ml-20 " onClick={() => onClick(generes.ALL)}>
          <img src="/images/Todos.png" className="mapG-img h-60 relative"></img>
          <p className="Title font-Gothic text-right font-bold text-2xl text-white absolute bottom-0 left-24 top-24"> Todos</p>
        </div>
      </div>
      <div className="Historys flex w-full grid grid-cols-2 gap-4 ">
        <List
          itemLayout="vertical"
          size="large"
          dataSource={history}
          renderItem={(item, i) => (
            <React.Fragment key={i}>
              <CardHistory history={item} />
            </React.Fragment>
          )}
          pagination={{
            onChange: page => {
              console.log(page)
            },
            pageSize: 3
          }}
        ></List>
      </div>
    </div>
  )
}

export default Genere
