import client from '@/graphql/config'
import { listStores } from '@/graphql/stores/queries/listStores'
import { listStoresByGenere } from '@/graphql/stores/queries/listStoresByGenere'
import { IStores } from '@/types/interfaces/Stores/stores.interface'

import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'

export const getAllStores = async (): Promise<IStores[]> => {
  client.cache.reset()
  return convertTotable<IStores>(await (await client.query({ query: gql(listStores) })).data.listStores)
}

export const listStoresByGenereFn = async (
  genere: string,
  filters: { department?: string | null; city?: string | null; zone?: number | null }
): Promise<IStores[]> => {
  client.cache.reset()
  return convertTotable<IStores>(
    await (
      await client.query({ query: gql(listStoresByGenere), variables: { genere, filters } })
    ).data.listStoresByGenere
  )
}
