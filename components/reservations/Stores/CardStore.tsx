import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { HomeOutlined } from '@ant-design/icons'
import React from 'react'
const CardStore = ({ onClick, store }: { store: IStores; onClick: (value: IStores) => void }) => {
  return (
    <>
      <div className="Container_Sto  " onClick={() => onClick(store)}>
        <div className="Image_containerS ">
          <HomeOutlined style={{ fontSize: '60px', color: '#08c', justifyContent: 'center' }} />
        </div>
        <div className="Container_Information">
          <div className="mb-8">
            <p className="text-sm text-gray-600 flex items-center"></p>
            <div className="text-gray-900 font-bold text-xl mb-2"> {store.name}</div>
            <p className="text-gray-700 text-base">{store.address}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardStore
