import { getClientCurrentShoppingCardFn } from '@/services/shoppingCar'
import { IShoppingCard } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import React, { useContext, useEffect, useState } from 'react'
import useAuth from './AuthContext'

// import useData from './DataContext'
type carContext = {
  car: IShoppingCard
  setCar: (car: IShoppingCard) => void
  getData: () => Promise<void>
}
const CarContext = React.createContext<carContext>({} as carContext)

export const CarProvider = (props: { children: JSX.Element }) => {
  //props
  const { children } = props
  const { user } = useAuth()
  //States
  const [car, setCar] = useState<IShoppingCard>({} as IShoppingCard)

  useEffect(() => {
    if (user) {
      getData()
    }
  }, [user])

  const getData = async () => {
    const value = await getClientCurrentShoppingCardFn(user._id as string)
    setCar(value)
  }

  return (
    <CarContext.Provider
      value={{
        car,
        setCar,
        getData
      }}
    >
      {children}
    </CarContext.Provider>
  )
}

const useCar = () => {
  return useContext(CarContext)
}
export default useCar
