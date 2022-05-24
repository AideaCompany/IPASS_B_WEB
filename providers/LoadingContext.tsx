import Spin from '@/components/Spin'
import React, { Dispatch, SetStateAction, useContext, useState } from 'react'

// import useData from './DataContext'

type typeLoginContext = {
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

const LoadingContext = React.createContext<typeLoginContext>({} as typeLoginContext)

export const LoadingProvider = (props: { children: JSX.Element }) => {
  //States
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading
      }}
    >
      <Spin loading={loading}>{props.children}</Spin>
    </LoadingContext.Provider>
  )
}

const useLoading = () => {
  return useContext(LoadingContext)
}
export default useLoading
