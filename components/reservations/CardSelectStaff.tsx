import { IStaff } from '@/types/interfaces/staff/staff.interface'
import React from 'react'
const CardSelectStaff = ({ onClick, staffer }: { onClick: () => void; staffer: IStaff }) => {
  return (
    <>
      <div className=" w-56  h-72 lg:max-w-full lg:flex border" onClick={onClick}>
        <div className="flex flex-col items-center justify-center bg-white p-4 shadow rounded-lg">
          <h2 className="mt-4 font-bold text-xl">{staffer.name}</h2>

          <p className="text-xs text-gray-500 text-center mt-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab enim molestiae nulla.</p>

          <ul className="flex flex-row mt-4 space-x-2">
            <li>
              <a href="" className="flex items-center justify-center h-8 w-8 border rounded-full text-gray-800 border-gray-800">
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="" className="flex items-center justify-center h-8 w-8 border rounded-full text-gray-800 border-gray-800">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="" className="flex items-center justify-center h-8 w-8 border rounded-full text-gray-800 border-gray-800">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default CardSelectStaff
