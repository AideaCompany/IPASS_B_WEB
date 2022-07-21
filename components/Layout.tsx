import useAuth from '@/providers/AuthContext'
import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import { UserOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import useWindowDimensions from 'hooks/useWindowDimensions'
import { HistoryIcon, VantLogoIcon } from 'icons/personalIcons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import MenuDrawer from './MenuDrawer'
import CarDrawer from './ShoppingCar/CarDrawer'
// const VerifyDeviceDynamic = dynamic(() => import('./VerifyDevice'), { ssr: false })
const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const { width } = useWindowDimensions()
  const router = useRouter()
  // <VerifyDeviceDynamic />
  const reservation = useReservation()
  const [visibleCar, setVisibleCar] = useState(false)
  const goStart = () => {
    console.log('aqui')
    if (reservation) {
      reservation.setStep(stepsPageReservation.Genere)
    } else {
      router.push('reservation')
    }
  }
  return (
    <div className="layout_container">
      <div className="header">
        <div className="title">
          <div style={{ cursor: 'pointer' }} onClick={goStart}>
            <VantLogoIcon />
          </div>
        </div>

        {user && (
          <div className="button_menu">
            {width > 768 ? (
              <>
                <div className="icon">
                  <Tooltip title="Historial">
                    <Link href={'history'}>
                      <HistoryIcon />
                    </Link>
                  </Tooltip>
                </div>
                <div className="icon">
                  <Tooltip title={'Carrito de compras'}>
                    <CarDrawer visible={visibleCar} setVisible={setVisibleCar} />
                  </Tooltip>
                </div>
                <div className="icon">
                  <Tooltip title="Mi perfil">
                    <Link href={'profile'}>
                      {user.photo && user.photo ? (
                        <div className="container_img_profile">
                          <img src={user.photo.key} />
                        </div>
                      ) : (
                        <UserOutlined />
                      )}
                    </Link>
                  </Tooltip>
                </div>
              </>
            ) : (
              <div className="icon">
                <MenuDrawer />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="main_container">{children}</div>
    </div>
  )
}

export default Layout
