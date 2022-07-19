import useAuth from '@/providers/AuthContext'
import { MenuOutlined, UserOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Drawer } from 'antd'
import { HistoryIcon } from 'icons/personalIcons'
import { useState } from 'react'
import CarDrawer from './ShoppingCar/CarDrawer'
const MenuDrawer = () => {
  const [visible, setVisible] = useState(false)
  const onClose = () => {
    setVisible(false)
  }
  const { user } = useAuth()
  const [visibleCar, setVisibleCar] = useState(false)
  return (
    <>
      <MenuOutlined style={{ fontSize: '30px' }} onClick={() => setVisible(true)} />
      <Drawer title={'Menu'} placement="right" onClose={onClose} visible={visible}>
        <div className="menu_drawer_container">
          <Link href={'profile'}>
            <div className="menu_item">
              <div className="icon">
                {user?.photo && user?.photo ? (
                  <div className="container_img_profile">
                    <img src={user.photo.key} />
                  </div>
                ) : (
                  <UserOutlined />
                )}
              </div>

              <p className="font-semibold text-base">Mi perfil</p>
            </div>
          </Link>
          <div
            onClick={() => {
              setVisible(false)
              setVisibleCar(true)
            }}
            className="menu_item"
          >
            <div className="icon">
              <CarDrawer visible={visibleCar} setVisible={setVisibleCar} />
            </div>
            <p className="font-semibold text-base">Carrito</p>
          </div>
          <Link href={'history'}>
            <div className="menu_item">
              <div className="icon">
                <HistoryIcon />
              </div>
              <p className="font-semibold text-base">historial</p>
            </div>
          </Link>
        </div>
      </Drawer>
    </>
  )
}

export default MenuDrawer
