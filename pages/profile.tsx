import Config from '@/components/profile/Config'
import FormComponent from '@/components/profile/FormComponent'
import useAuth from '@/providers/AuthContext'
import { listOccupationFn } from '@/services/occupation'
import { IOccupation } from '@/types/interfaces/Occupation/occupation.interface'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
const profile = () => {
  const { user } = useAuth()
  const [occupation, setOccupation] = useState<IOccupation[]>([])
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const data = await listOccupationFn()
    console.log(data)
    setOccupation(data)
  }

  return (
    <Layout>
      <div className="main_container_profile">
        {user && occupation && (
          <>
            <Config />
            <FormComponent occupation={occupation} />
          </>
        )}
      </div>
    </Layout>
  )
}

export default profile
