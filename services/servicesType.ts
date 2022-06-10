import client from '@/graphql/config'
import { listServiceTypeByStore } from '@/graphql/servicesType/queries/listServiceType'
import { IServiceType } from '@/types/interfaces/ServiceType/serviceType.interface'
import { convertTotable } from '@/utils/utils'
import { gql } from '@apollo/client'

export const listServiceTypeByStoreFn = async (_id: string): Promise<IServiceType[]> => {
  client.cache.reset()
  return convertTotable<IServiceType>(
    await (
      await client.query({ query: gql(listServiceTypeByStore), variables: { _id } })
    ).data.listServiceTypeByStore
  )
}
