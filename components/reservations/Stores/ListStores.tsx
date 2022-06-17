import Selector from '@/components/Selector'
import useReservation from '@/providers/ReservationContext'
import { listStoresByGenereFn } from '@/services/stores'
import { getKilometers } from '@/utils/utils'
import { Form, FormInstance, List } from 'antd'
import _ from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { IStores, storeFilter } from '../../../types/interfaces/Stores/stores.interface'
import CardStore from './CardStore'
import Map from './Map'

const ListStores = () => {
  const [stores, setStores] = useState<IStores[]>([])
  const [currentStore, setCurrentStore] = useState<IStores>()
  const [currentFilters, setCurrentFilters] = useState({
    department: null,
    city: null,
    zone: null
  })

  const [filters, setFilters] = useState<storeFilter>({
    department: [],
    city: [],
    zone: []
  })

  // const { setSelectedStore } = useReservation()

  const { genere } = useReservation()
  const formRef = useRef<FormInstance>(null)
  const onClick = (store: IStores) => {
    // setStep(stepsPageReservation.Select)
    // setSelectedStore(store)
    setCurrentStore(store)
  }
  useEffect(() => {
    if (genere) {
      getData()
    }
  }, [genere, currentFilters])

  const getData = async () => {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const newStores = await listStoresByGenereFn(genere, currentFilters)
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
        const newStores = await listStoresByGenereFn(genere, currentFilters)
        setStores(newStores)
        setCurrentStore(newStores[0])
      }
    )
  }

  useEffect(() => {
    setFilters({
      department: _.uniq(stores.map(e => e.department)),
      city: _.uniq(stores.map(e => e.city)),
      zone: _.uniq(stores.map(e => e.zone))
    })
  }, [stores])

  return (
    <div className="container_list_stores ">
      <div className="Container_bar1 w-full ">
        <Form>
          <Selector
            formRef={formRef}
            name="department"
            placeHolder="Seleccione un departamento"
            values={filters.department.map(e => ({ value: e, label: e }))}
          />
          <Selector formRef={formRef} name="city" placeHolder="Seleccione una ciudad" values={filters.city.map(e => ({ value: e, label: e }))} />
          <Selector
            formRef={formRef}
            name="zone"
            placeHolder="Seleccione zona"
            values={filters.zone.map(e => ({ value: e.toString(), label: e.toString() }))}
          />
        </Form>
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
