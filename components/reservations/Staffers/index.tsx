import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import { listStaffByStoreFn } from '@/services/staff'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { CaretDownOutlined } from '@ant-design/icons'
<<<<<<< HEAD

=======
>>>>>>> ce7e04d1c97c290deee82d80255df54944f6bf72
import React, { useEffect, useState } from 'react'
import { stepsPageReservation } from '../reservationsComponent'
import CardStaffers from './CardStaffers'

const Staffers = ({ selectedStore, onChangeStaff }: { onChangeStaff: (value: IStaff) => void; selectedStore: IStores }) => {
  const { setStep } = useReservation()

  const onClick = (staff: IStaff) => {
    setStep(stepsPageReservation.selectDate)
    onChangeStaff(staff)
  }
  const [staffers, setStaffers] = useState<IStaff[]>([])

  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    setStaffers(await listStaffByStoreFn(selectedStore._id as string))
  }

  return (
    <div className="Main_Container">
      <div className="Container_bar ">
        <div className="Search_bar flex appearance-none   left-2 m-5 sm:max-w-screen-sm text-stone-900">
          <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
          </svg>
          <input type="text" className="appearance-none bg-transparent px-4 py-2 w-64" placeholder="Buscar profesional"></input>
        </div>

        <div className="Search_list flex appearance-none border-b  left-2 m-5 sm:max-w-screen-sm text-stone-900">
          <input type="text" className="appearance-none bg-transparent px-4 py-2 w-64" placeholder="Buscar tipo de servicio"></input>
          <CaretDownOutlined />
        </div>
        <div className="Main_tittle ">
          <p className="Title font-Gothic text-right "> Profesionales</p>{' '}
        </div>
      </div>
      <div className="Container_personal  grid grid-cols-3 gap-x-8 gap-y-0">
        {staffers.map((staffer, i) => (
          <React.Fragment key={i}>
            <CardStaffers staffer={staffer} onClick={() => onClick(staffer)} />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Staffers
