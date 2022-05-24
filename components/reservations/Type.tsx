import { CaretDownOutlined, ScissorOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'

const Type = () => {
  return (
    <div className="Main_Container">
      <div className="Container_bar ">
        <div className="Search_bar flex appearance-none   left-2 m-5 sm:max-w-screen-sm text-stone-900">
          <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
          </svg>
          <input type="text" className="appearance-none bg-transparent px-4 py-2 w-64" placeholder="Buscar peinado"></input>
        </div>

        <div className="Search_list flex appearance-none border-b  left-2 m-5 sm:max-w-screen-sm text-stone-900">
          <input type="text" className="appearance-none bg-transparent px-4 py-2 w-64" placeholder="Seleccionar tipo de servicio"></input>
          <CaretDownOutlined />
        </div>
        <div className="Main_tittle ">
          <p className="Title font-Gothic text-right "> tipo de servicio</p>
        </div>
      </div>
      <div className="Container_fluid2  ">
        <div className="Container_F_Text ">
          <p className="Title font-Gothic text-right font-bold text-xl ">Reservar por </p>
        </div>
        <div className="Container_Tarjet  divide-y divide-slate-100">
          <div className="Tarjet_men ">
            <p className="Title font-Gothic text-right font-bold text-lg">Caballeros</p>
            <div className="Main_Staffer ">
              <div className="Staffer_icon " style={{ fontSize: '45px' }}>
                <p>
                  <UserOutlined />
                </p>
              </div>

              <div className="Staffer_text ">
                <p className="Title font-Gothic text-right ">Selecciona tu staffer de preferencia</p>{' '}
              </div>
            </div>
          </div>
          <div className="Tarjet_Women ">
            <p className="Title font-Gothic text-right font-bold text-lg">Damas</p>
            <div className="Main_Service">
              <div className="Service_icon " style={{ fontSize: '45px' }}>
                <p>
                  <ScissorOutlined />
                </p>{' '}
              </div>
              <div className="Service_text ">
                <p className="Title font-Gothic text-right "> Selecciona el servicio que deseas adquirir</p>{' '}
              </div>
            </div>
          </div>
          <div className="Tarjet_Children ">
            <p className="Title font-Gothic text-right font-bold text-lg">Niños/Niñas</p>
            <div className="Main_Service">
              <div className="Service_icon " style={{ fontSize: '45px' }}>
                <p>
                  <ScissorOutlined />
                </p>{' '}
              </div>
              <div className="Service_text ">
                <p className="Title font-Gothic text-right "> Selecciona el servicio que deseas adquirir</p>{' '}
              </div>
            </div>
          </div>
        </div>
        <div className="Container_S_Text "></div>
      </div>
    </div>
  )
}

export default Type
