import useReservation from '@/providers/ReservationContext'
import { listStaffByStoreFn } from '@/services/staff'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { CaretDownOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import CardStaffers from './CardStaffers'

const Staffers = () => {
  const { selectedStore } = useReservation()

  const [staffers, setStaffers] = useState<IStaff[]>([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    setStaffers(await listStaffByStoreFn(selectedStore?._id as string))
  }

  return (
    <div className="Main_Container">
      <div className="Container_bar pt-4">
        {/* <div className="Search_bar flex appearance-none   left-2 m-5 sm:max-w-screen-sm text-stone-900">
          <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
          </svg>
          <input type="text" className="appearance-none bg-transparent px-4 py-2 w-64" placeholder="Buscar profesional"></input>
        </div>

        <div className="Search_list flex appearance-none border-b  left-2 m-5 sm:max-w-screen-sm text-stone-900">
          <input type="text" className="appearance-none bg-transparent px-4 py-2 w-64" placeholder="Buscar tipo de servicio"></input>
          <CaretDownOutlined />
        </div> */}
      </div>
      <div className="Container_personal p-8 grid h-auto grid-cols-4 gap-x-6  gap-y-8">
        {staffers.map((staffer, i) => (
          <React.Fragment key={i}>
            <CardStaffers staffer={staffer} />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Staffers
