import { UserOutlined } from '@ant-design/icons'
import { ShoppingCard } from '../icons/personalIcons'
import React, { FC } from 'react'

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="header  ">
        <div className="title  font-Butler font-bold text-6xl ">
          <p>VANT</p>
        </div>
        <div className="car " style={{ fontSize: '30px' }}>
          <ShoppingCard />
        </div>

        <div className="profile" style={{ fontSize: '30px' }}>
          <UserOutlined />
        </div>
      </div>
      <div className="container mx-auto main_container  ">{children}</div>
    </>
  )
}

export default Layout
