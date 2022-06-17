import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { useEffect } from 'react'
const apiKey = process.env.NEXT_PUBLIC_MAPS_KEY
const mapContainerStyle = {
  width: '100%',
  height: '100%'
}
const Map = ({ store }: { store: IStores }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey as string
  })

  useEffect(() => {
    if (loadError) {
      console.error('Error con mapa', loadError)
    }
  }, [loadError])
  console.log(isLoaded)
  return (
    <>
      {isLoaded && (
        <div style={{ width: '100%', height: '100%' }}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            center={store.location}
            options={{
              fullscreenControl: false,
              clickableIcons: true,
              disableDefaultUI: false
            }}
          >
            <Marker position={store.location}></Marker>
          </GoogleMap>
        </div>
      )}
    </>
  )
}

export default Map
