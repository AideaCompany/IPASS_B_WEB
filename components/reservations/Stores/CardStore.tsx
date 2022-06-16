import Button from '@/components/Button'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { Rate } from 'antd'
import React from 'react'
const CardStore = ({ onClick, store }: { store: IStores; onClick: (value: IStores) => void }) => {
  return (
    <>
      <div className="Container_Sto cursor-pointer " onClick={() => onClick(store)}>
        <div className="Image_containerS ">
          <img alt="" src="/images/Store.png" className="map1-img" />
        </div>
        <div className="Container_Information">
          <div className="mb-8 h-24">
            <p className="text-sm text-gray-600 flex items-center"></p>

            <div className="w-full ">
              <Rate></Rate>
              <div className="text-gray-900 font-bold text-sm  mt-2"> {store.name}</div>
              <div className="text-gray-700 text-xs  mt-2"> {store.address}</div>
              <div className="text-gray-700 text-xs  mt-2 "> 3152349905</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardStore
