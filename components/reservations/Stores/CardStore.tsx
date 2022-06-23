import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { Rate } from 'antd'
import numeral from 'numeral'
const CardStore = ({ onClick, store }: { store: IStores; onClick: (value: IStores) => void }) => {
  return (
    <>
      <div className="Container_Sto cursor-pointer ">
        <div className="Image_containerS ">
          <img alt="" src="/images/Store.png" className="map1-img" />
        </div>
        <div className="Container_Information">
          <div className="mb-8 h-16">
            <p className="text-sm text-gray-600 flex items-center"></p>

            <div className="w-full flex ">
              <div className="w-1/2">
                <div className="text-gray-900 font-bold text-sm  mt-2 w-full text-left"> {store.name}</div>
                <div className="text-gray-700 text-xs  mt-1 w-full text-left"> Contacto: {store.contact}</div>
                <div className="text-gray-700 text-xs w-1/2 text-left mt-1"> Dir:{store.address}</div>
                <div className="text-gray-700 text-xs w-1/2 text-left mt-1 "> Tel:{store.phone}</div>
              </div>
              <div className="text-gray-700 text-xs  mt-2 w-1/2 text-center">
                {' '}
                <Rate style={{ fontSize: '15px' }}></Rate>
                {store.distance && <div className="text-gray-700 text-xs  text-right mt-2 "> {numeral(store.distance).format('00.00')} km de ti</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardStore
