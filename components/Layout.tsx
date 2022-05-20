import { UserOutlined } from '@ant-design/icons'
import { ShoppingCard } from '../icons/personalIcons'
import React, { FC } from 'react'
import { Badge } from 'antd'
import useCar from '@/providers/CarContext'
import Link from 'next/link'

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { car } = useCar()

  return (
    <>
      <div className="header  ">
        <div className="title  font-Butler font-bold text-6xl ">
          <p>VANT</p>
        </div>
        <div className="car " style={{ fontSize: '30px' }}>
          <Badge color={'#D2B782'} count={car?.services?.length}>
            <ShoppingCard style={{ fontSize: '30px' }} />
          </Badge>
        </div>

        <div className="profile" style={{ fontSize: '30px' }}>
          <Link href={'profile'}>
            <UserOutlined />
          </Link>
        </div>
      </div>
      <div className="container mx-auto main_container  ">{children}</div>
    </>
  )
}

export default Layout
