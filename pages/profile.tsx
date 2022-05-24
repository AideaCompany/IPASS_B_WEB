import Config from '@/components/profile/Config'
import FormComponent from '@/components/profile/FormComponent'
import useAuth from '@/providers/AuthContext'
import React from 'react'
import Layout from '../components/Layout'
const profile = () => {
  const { user } = useAuth()
  return (
    <Layout>
      <div className="main_container_profile">
        {user && (
          <>
            <Config />
            <FormComponent />
          </>
        )}
      </div>
    </Layout>
  )
}

export default profile
