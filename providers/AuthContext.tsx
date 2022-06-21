import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
//next
import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { $security } from '../config'
import { setToken } from '../graphql/config'
import { getClientFn } from '../services/clients'
import { IClient } from '../types/types'

// import useData from './DataContext'

type typeAuthContext = {
  user: IClient | null
  isAuthenticated: boolean
  login: (token: string, firstLogin?: boolean) => Promise<void>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  setSpinning: Dispatch<SetStateAction<boolean>>
  spinning: boolean
}

const AuthContext = React.createContext<typeAuthContext>({} as typeAuthContext)

export const AuthProvider = (props: { children: JSX.Element }) => {
  //props
  const { children } = props
  //next
  const router = useRouter()
  //States
  const [user, setUser] = useState<IClient | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [spinning, setSpinning] = useState(true)

  useEffect(() => {
    ;(async () => {
      if (Cookie.get('authIpassClient') !== undefined) {
        const data = jwt.verify(Cookie.get('authIpassClient') as string, $security.secretKey) as { data: IClient }
        const currentUser = await getClientFn(data.data._id as string)
        setUser(currentUser)
      }
    })()
  }, [])

  //functions

  const login = async (token: string) => {
    const data = jwt.verify(token, $security.secretKey) as { data: IClient }
    const currentUser = await getClientFn(data.data._id as string)
    console.log(currentUser)
    if (currentUser.active) {
      setUser(currentUser)
      Cookie.set('authIpassClient', token, { expires: 1 })
      setSpinning(false)
      setLoading(false)
      setToken(token)
      router.push({ pathname: '/reservations' })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        loading,
        setLoading,
        setSpinning,
        spinning
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  return useContext(AuthContext)
}
export default useAuth
