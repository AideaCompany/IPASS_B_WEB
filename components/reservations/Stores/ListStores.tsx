import useReservation from '@/providers/ReservationContext'
import { CaretDownOutlined } from '@ant-design/icons'
import { List } from 'antd'

import React from 'react'
import { IStores } from '../../../types/interfaces/Stores/stores.interface'
import { stepsPageReservation } from '../reservationsComponent'
import CardStore from './CardStore'

const ListStores = ({ setStep }: { setStep: React.Dispatch<React.SetStateAction<stepsPageReservation>> }) => {
  const { stores, setSelectedStore } = useReservation()

  const onClick = (store: IStores) => {
    setStep(stepsPageReservation.Select)
    setSelectedStore(store)
  }
  return (
    <div className="container_list_stores ">
      <div className="Container_bar1 ">
        <div className="Search_bar flex appearance-none   left-2 m-5 sm:max-w-screen-sm text-stone-900">
          <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
          </svg>
          <input type="text" className="appearance-none bg-transparent px-4 py-2 w-64" placeholder="Buscar sede"></input>
        </div>

        <div className="Search_list1 flex appearance-none border-b  left-2 m-5 sm:max-w-screen-sm text-stone-900">
          <input type="text" className="appearance-none bg-transparent px-4 py-2 w-64" placeholder="Buscar tipo de sede"></input>
          <CaretDownOutlined />
        </div>
        <div className="Main_tittle1 ">
          <p className="Title font-Gothic text-right "> </p>{' '}
        </div>
      </div>
      <div className="Container_select1 ">
        <div className="Image_container">
          {/* <div className="Image_background"></div> */}
          <img src="/images/Maps.png" className="map1-img"></img>
        </div>
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
