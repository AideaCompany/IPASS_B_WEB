import Layout from '@/components/Layout'
import CardHistory from '@/components/history/CardHistory'
import useAuth from '@/providers/AuthContext'
import { getClientShoppingCardsFn } from '@/services/shoppingCar'
import { IShoppingCard } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import React, { useEffect, useState } from 'react'
import { List } from 'antd'

const History = () => {
  const { user } = useAuth()
  const [history, setHistory] = useState<IShoppingCard[]>([])
  useEffect(() => {
    if (user) {
      getData()
    }
  }, [user])

  const getData = async () => {
    const data = await getClientShoppingCardsFn(user?._id as string)
    setHistory(data)
  }

  return (
    <Layout>
      <div className="Container_MainH">
        <div className="Tittle">
          <p className="text-left text-black font-Gothic font-bold text-xl">Consulta el historial de tus servicios</p>
        </div>
        <div className="CardH ">
          <List
            itemLayout="vertical"
            size="large"
            dataSource={history}
            renderItem={(item, i) => (
              <React.Fragment key={i}>
                <CardHistory history={item} />
              </React.Fragment>
            )}
            pagination={{
              onChange: page => {
                console.log(page)
              },
              pageSize: 3
            }}
          ></List>
        </div>
      </div>
    </Layout>
  )
}

export default History
