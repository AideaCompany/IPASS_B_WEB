import Button from '@/components/Button'
import SelectorStores from '@/components/SelectorStores'
import Spin from '@/components/Spin'
import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import { listStoresByGenereFn } from '@/services/stores'
import { getKilometers } from '@/utils/utils'
import { FormInstance, List } from 'antd'
import lodash from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { IStores, storeFilter } from '../../../types/interfaces/Stores/stores.interface'
import CardStore from './CardStore'
import Map from './Map'

const ListStores = () => {
  const [stores, setStores] = useState<IStores[]>([])
  const [currentStore, setCurrentStore] = useState<IStores>()
  const [loading, setLoading] = useState(true)
  const [currentFilters, setCurrentFilters] = useState<{
    department: null | string
    city: null | string
    zone: null | number
  }>({
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
        setLoading(false)
      },
      async error => {
        const newStores = await listStoresByGenereFn(genere, currentFilters)
        setStores(newStores)
        setCurrentStore(newStores[0])
        setLoading(false)
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
    <>
      <Spin loading={loading}>
        <div className="container_list_stores ">
          {/* <p className="Title font-Gothic text-right pt-4 ">Selección de establecimiento</p> */}
          <div className="Container_bar mt-6 ">
            <div className="Container_bar1 flex grid-cols-3 gap-x-28  mt-6 pt-6 w-full">
              <SelectorStores
                formRef={formRef}
                name="department"
                onChange={value => setCurrentFilters(old => ({ ...old, department: value === '' ? null : value }))}
                placeHolder="Seleccione un departamento"
                values={filters.department.map(e => ({ value: e, label: e }))}
              />
              <SelectorStores
                formRef={formRef}
                name="city"
                onChange={value => setCurrentFilters(old => ({ ...old, city: value === '' ? null : value }))}
                placeHolder="Seleccione una ciudad"
                values={filters.city.map(e => ({ value: e, label: e }))}
              />
              <SelectorStores
                formRef={formRef}
                onChange={value => setCurrentFilters(old => ({ ...old, zone: value === '' ? null : parseInt(value) }))}
                name="zone"
                placeHolder="Seleccione zona"
                values={filters.zone.map(e => ({ value: e?.toString(), label: e?.toString() }))}
              />
            </div>
          </div>
          <div className="Container_select1  w-full ">
            <div className="Image_container ">{currentStore && <Map store={currentStore} />}</div>
            <div className="Main_carousel1  m-2">
              <div style={{ display: 'flex', justifyContent: 'center' }} className="Button_Select  w-full">
                <Button title="Seleccionar" onClick={onClick} />
              </div>
              <div className="List">
                <List
                  dataSource={stores}
                  renderItem={item => (
                    <React.Fragment key={item.name}>
                      <CardStore isSelect={currentStore === item} store={item} onClick={() => handleButton(item)} />
                    </React.Fragment>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </>
  )
}

export default ListStores
