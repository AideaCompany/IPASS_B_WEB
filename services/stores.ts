import client from '@/graphql/config'
import { listStores } from '@/graphql/stores/queries/listStores'
import { IStores } from '@/types/interfaces/Stores/stores.interface'

import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'

export const getAllStores = async (): Promise<IStores[]> => {
  client.cache.reset()
  return convertTotable<IStores>(await (await client.query({ query: gql(listStores) })).data.listStores)
}
