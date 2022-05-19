import Layout from '@/components/Layout'
import CardHistory from '@/components/history/CardHistory'

import useAuth from '@/providers/AuthContext'
import { getClientShoppingCardsFn } from '@/services/shoppingCar'
import { IShoppingCard } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import React, { useEffect, useState } from 'react'

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
      {history.map((history, i) => (
        <React.Fragment key={i}>
          <CardHistory history={history} />
        </React.Fragment>
      ))}
    </Layout>
  )
}

export default History
