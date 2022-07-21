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
      <p className="title font-Gothic text-center text-sm font-bold mt-4">Selecciona para quien es el servicio </p>
      <div className="Container_Tar w-full grid grid-cols-2 gap-y-6  gap-x-6 mt-10 h-auto">
        {validGeneres.map((genere, key) => (
          <div key={key} className="container_genere">
            <div className="Container_GEN  cursor-pointer " onClick={() => onClick(genere.click)}>
              <img src={genere.imagen} className="mapG-img  w-full"></img>
              <div className="Gradient justify-self-center"></div>
              <p className="title_genere font-Gothic  font-bold text-2xl text-white absolute bottom-0 left-12 top-24 "> {genere.title}</p>
            </div>
          </div>
        ))}
      </div>
      {history.length > 0 && (
        <div className="Historys flex w-full p-6 mt-4 flex justify-center">
          <List
            grid={{ gutter: 10, column: 2 }}
            itemLayout="vertical"
            size="large"
            dataSource={history}
            renderItem={(item, i) => (
              <React.Fragment key={i}>
                <CardHistory history={item} />
              </React.Fragment>
            )}
            pagination={{
              pageSize: 2
            }}
          ></List>
        </div>
      )}
    </div>
  )
}

export default Genere
