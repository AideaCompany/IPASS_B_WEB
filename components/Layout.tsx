import useAuth from '@/providers/AuthContext'
import { UserOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import useWindowDimensions from 'hooks/useWindowDimensions'
import { HistoryIcon, VantLogoIcon } from 'icons/personalIcons'
import Link from 'next/link'
import React, { FC, useState } from 'react'
import MenuDrawer from './MenuDrawer'
import CarDrawer from './ShoppingCar/CarDrawer'
// const VerifyDeviceDynamic = dynamic(() => import('./VerifyDevice'), { ssr: false })
const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const { width } = useWindowDimensions()
  // <VerifyDeviceDynamic />

  const [visibleCar, setVisibleCar] = useState(false)
  return (
    <div className="layout_container">
      <div className="header">
        <div className="title">
          <Link href={'/reservations'}>
            <VantLogoIcon />
          </Link>
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
