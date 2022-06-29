import useAuth from '@/providers/AuthContext'
import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import { getClientShoppingCardsFn } from '@/services/shoppingCar'
import { IShoppingCard } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import { generes } from '@/types/interfaces/Stores/stores.interface'
import { List } from 'antd'
import React, { useEffect, useState } from 'react'
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

  const validGeneres = [
    {
      click: generes.MEN,
      title: 'Caballeros',
      imagen: '/images/Caballeros.png'
    },
    {
      click: generes.WOMEN,
      title: 'Damas',
      imagen: '/images/Damas.png'
    },
    {
      click: generes.CHILDREN,
      title: 'Damas',
      imagen: '/images/Niños.png'
    },
    {
      click: generes.ALL,
      title: 'Todos',
      imagen: '/images/Todos.png'
    }
  ]

  return (
    <div className="Container_Genere  w-full pt-4">
      <p className="Title font-Gothic text-center text-sm font-bold mt-4">Selecciona para quien es el servicio </p>
      <div className="Container_Tar w-full grid grid-cols-2 gap-x-6 gap-y-6 mt-10 h-auto">
        {validGeneres.map(genere => (
          <div className="Container_GEN  cursor-pointer  relative  justify-self-center  ml-12" onClick={() => onClick(genere.click)}>
            <img src={genere.imagen} className="mapG-img w-full relative justify-self-center "></img>
            <div className="Gradient justify-self-center"></div>
            <p className="Title font-Gothic  font-bold text-2xl text-white absolute bottom-0 left-24 top-24 "> {genere.title}</p>
          </div>
        ))}
      </div>
      {history.length > 0 && (
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
              pageSize: 3
            }}
          ></List>
        </div>
      )}
    </div>
  )
}

export default Genere
