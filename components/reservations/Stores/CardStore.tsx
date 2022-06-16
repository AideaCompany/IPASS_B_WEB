import Button from '@/components/Button'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { Rate } from 'antd'
import numeral from 'numeral'
import React from 'react'
const CardStore = ({ onClick, store }: { store: IStores; onClick: (value: IStores) => void }) => {
  return (
    <>
      <div
        className="Container_Sto cursor-pointer "
        onClick={() => {
          onClick(store)
        }}
      >
        <div className="Image_containerS ">
          <img alt="" src="/images/Store.png" className="map1-img" />
        </div>
        <div className="Container_Information">
          <div className="mb-8">
            <p className="text-sm text-gray-600 flex items-center"></p>
            <div className="w-full  flex">
              <div className="text-gray-900 font-bold text-xl w-1/3 mb-2"> {store.name}</div>
              <div className="Container_Rate w-2/3  mb-2 divide-y divide-slate-200"></div>
            </div>
            <p className="text-gray-700 text-base">{store.address}</p>
            <div className="w-full  flex">
              <div className="text-gray-700 text-base mt-4"> {store.phone}</div>
              {store.distance && <div className="text-gray-700 text-base mt-4"> {numeral(store.distance).format('00.00')}</div>}
              <div className="Container_Rate w-2/3  divide-y divide-slate-200">
                <Button title="Seleccionar Sede" onClick={() => onClick(store)} customClassName="button  text-xs h-8 aling-center"></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardStore
