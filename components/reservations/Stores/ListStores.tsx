import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import { listStoresByGenereFn } from '@/services/stores'
import { getKilometers } from '@/utils/utils'
import { CaretDownOutlined } from '@ant-design/icons'
import { List } from 'antd'
import React, { useEffect, useState } from 'react'
import { IStores } from '../../../types/interfaces/Stores/stores.interface'
import CardStore from './CardStore'
import Map from './Map'
const ListStores = () => {
  const [stores, setStores] = useState<IStores[]>([])
  const [currentStore, setCurrentStore] = useState<IStores>()
  const [filters, setFilters] = useState({
    department: null,
    city: null,
    zone: null
  })
  const { setSelectedStore } = useReservation()

  const { setStep, genere } = useReservation()

  const onClick = (store: IStores) => {
    // setStep(stepsPageReservation.Select)
    // setSelectedStore(store)
    setCurrentStore(store)
  }
  useEffect(() => {
    if (genere) {
      getData()
    }
  }, [genere])

  const getData = async () => {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const newStores = await listStoresByGenereFn(genere, filters)
        //@ts-ignore
        const storeWithDistance: IStores[] = newStores.map(store => ({
          ...stores,
          distance: getKilometers(store.location.lat, store.location.lng, position.coords.latitude, position.coords.longitude)
        }))
        const sorted = storeWithDistance.sort((a, b) => (a.distance as number) - (b.distance as number))
        setStores(sorted)
        setCurrentStore(sorted[0])
      },
      async error => {
        const newStores = await listStoresByGenereFn(genere, filters)
        setStores(newStores)
        setCurrentStore(newStores[0])
      }
    )
  }
  return (
    <div className="container_list_stores ">
      <div className="Container_bar1 w-full ">
        <div className="Search_list1 flex appearance-none border-b  left-4 m-5 sm:max-w-screen-sm w-1/3 text-stone-900 ">
          <input type="text" className="appearance-none bg-transparent px-4 py-2 w-60" placeholder="Seleccionar Departamento"></input>
          <CaretDownOutlined />
        </div>
        <div className="Search_list1 flex appearance-none border-b  left-2 m-5 sm:max-w-screen-sm w-1/3 text-stone-900 ">
          <input type="text" className="appearance-none bg-transparent px-4 py-2 " placeholder="Seleccionar ciudad"></input>
          <CaretDownOutlined />
        </div>
        <div className="Search_list1 flex appearance-none border-b  left-2 m-5 sm:max-w-screen-sm w-1/3 text-stone-900 ">
          <input type="text" className="appearance-none bg-transparent px-4 py-2 w-60" placeholder="Seleccionar zona"></input>
          <CaretDownOutlined />
        </div>
      </div>
      <div className="Container_select1  w-full ">
        {currentStore && <Map store={currentStore} />}
        <div className="Main_carousel1  m-2 ">
          <List
            dataSource={stores}
            renderItem={item => (
              <React.Fragment key={item.name}>
                <CardStore store={item} onClick={onClick} />
              </React.Fragment>
            )}
          ></List>
        </div>
      </div>
    </div>
  )
}

export default ListStores
