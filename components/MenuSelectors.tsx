import SelectorStores from '@/components/SelectorStores'
import { storeFilter } from '@/types/interfaces/Stores/stores.interface'
import { MenuOutlined } from '@ant-design/icons'
import { FormInstance, Modal } from 'antd'
import { useRef, useState } from 'react'
const MenuSelectors = () => {
  const [visible, setVisible] = useState(false)

  const formRef = useRef<FormInstance>(null)
  const [_, setCurrentFilters] = useState<{
    department: null | string
    city: null | string
    zone: null | number
  }>({
    department: null,
    city: null,
    zone: null
  })

  const [filters] = useState<storeFilter>({
    department: [],
    city: [],
    zone: []
  })
  return (
    <>
      <MenuOutlined style={{ fontSize: '30px' }} onClick={() => setVisible(true)} />
      <Modal title={'Menu'} visible={visible}>
        <div className="Container_Select flex flex-col  mt-6 pt-6 w-full">
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
      </Modal>
    </>
  )
}

export default MenuSelectors
