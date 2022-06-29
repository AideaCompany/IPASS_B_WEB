import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { Rate } from 'antd'
import numeral from 'numeral'
const CardStore = ({ onClick, store, isSelect }: { store: IStores; onClick: () => void; isSelect: boolean }) => {
  return (
    <>
      <div onClick={onClick} className="Container_Sto cursor-pointer w-full" style={{ border: isSelect ? '2px solid #d2b782' : '0px' }}>
        <div className="Image_containerS  w-full">
          <img alt="" src="/images/Store.png" className="map1-img border h-full w-full" />
        </div>
        <div className="Container_Information w-full p-2">
          <div className="mb-8 h-full w-full ">
            <p className="text-sm text-gray-600 flex items-center"></p>

            <div className="w-full flex ">
              <div className="w-1/2">
                <div className="text-gray-900 font-bold text-sm  mt-2 w-full text-left"> {store.name}</div>
              </div>
              <div className="text-gray-700 text-xs  mt-2 w-1/2 text-center">
                {' '}
                <Rate style={{ fontSize: '15px' }}></Rate>
              </div>
            </div>
            <div className="w-full ">
              <div className="text-gray-700 text-xs  mt-1 w-full text-left"> Contacto: {store.contact}</div>
              <div className="text-gray-700 text-xs w-full text-left mt-1 text-ellipsis overflow-hidden"> Dir: {store.address}</div>
              <div className="text-gray-700 text-xs w-full text-left mt-1 "> Tel: {store.phone}</div>
              {store.distance && <div className="text-gray-700 text-xs  text-left mt-1 "> {numeral(store.distance).format('00.00')} km de ti</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardStore
