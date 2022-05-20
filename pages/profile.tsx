import Config from '@/components/profile/Config'
import FormComponent from '@/components/profile/FormComponent'
import React from 'react'
import Layout from '../components/Layout'
const profile = () => {
  return (
    <Layout>
      <div className="main_container_profile">
        <Config />
        <FormComponent />
      </div>
    </Layout>
  )
}

export default profile
