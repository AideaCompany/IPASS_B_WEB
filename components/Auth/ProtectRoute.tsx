import React, { useEffect } from 'react'
import { NextRouter } from 'next/router'
import useAuth from '../../providers/AuthContext'

const noLoggedPages = ['/', '/login', 'register']

/**
 *
 * @param props
 * @param props.children
 * @param props.router
 */
function ProtectRoute(props: { children: JSX.Element; router: NextRouter }): JSX.Element {
  const { loading, isAuthenticated } = useAuth()
  const { children, router } = props
  useEffect(() => {
    if (!loading) {
      if (!noLoggedPages.includes(router.pathname) && !isAuthenticated) {
        router.push(`/`)
      }
    }
  }, [loading])

  return !loading ? <>{children} </> : <></>
}

export default React.memo(ProtectRoute)
