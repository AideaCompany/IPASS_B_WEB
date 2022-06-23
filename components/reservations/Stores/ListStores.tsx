import Button from '@/components/Button'
import SelectorStores from '@/components/SelectorStores'
import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import { listStoresByGenereFn } from '@/services/stores'
import { getKilometers } from '@/utils/utils'
import { Form, FormInstance, List } from 'antd'
import lodash from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { IStores, storeFilter } from '../../../types/interfaces/Stores/stores.interface'
import CardStore from './CardStore'
import Map from './Map'

const ListStores = () => {
  const [stores, setStores] = useState<IStores[]>([])
  const [currentStore, setCurrentStore] = useState<IStores>()
  const [currentFilters, _] = useState({
    department: null,
    city: null,
    zone: null
  })

  const [filters, setFilters] = useState<storeFilter>({
    department: [],
    city: [],
    zone: []
  })

  const { setSelectedStore, setStep } = useReservation()

  const { genere } = useReservation()
  const formRef = useRef<FormInstance>(null)
  const onClick = () => {
    setStep(stepsPageReservation.Select)
    setSelectedStore(currentStore)
  }

  const handleButton = (item: IStores) => {
    setCurrentStore(item)
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
          ...store,
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
      department: lodash.uniq(stores.map(e => e.department)),
      city: lodash.uniq(stores.map(e => e.city)),
      zone: lodash.uniq(stores.map(e => e.zone))
    })
  }, [stores])

  return (
    <div className="container_list_stores ">
      <div className="Container_bar mt-6 ">
        <Form className="Container_bar1 flex grid-cols-3 gap-x-28  mt-6 pt-6 w-full">
          <SelectorStores
            formRef={formRef}
            name="department"
            placeHolder="Seleccione un departamento"
            values={filters.department.map(e => ({ value: e, label: e }))}
          />
          <SelectorStores
            formRef={formRef}
            name="city"
            placeHolder="Seleccione una ciudad"
            values={filters.city.map(e => ({ value: e, label: e }))}
          />
          <SelectorStores
            formRef={formRef}
            name="zone"
            placeHolder="Seleccione zona"
            values={filters.zone.map(e => ({ value: e?.toString(), label: e?.toString() }))}
          />
        </Form>
      </div>
      <div className="Container_select1  w-full ">
        {currentStore && <Map store={currentStore} />}
        <div className="Main_carousel1  m-2 ">
          <div style={{ display: 'flex', justifyContent: 'center' }} className="Button_Select  w-full">
            <Button title="Seleccionar" onClick={onClick} />
          </div>
          <List
            dataSource={stores}
            renderItem={item => (
              <React.Fragment key={item.name}>
                <CardStore isSelect={currentStore === item} store={item} onClick={() => handleButton(item)} />
              </React.Fragment>
            )}
          ></List>
        </div>
      </div>
    </div>
  )
}

export default ListStores
