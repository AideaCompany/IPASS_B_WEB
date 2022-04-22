import { getClient } from '../graphql/Client/queries/getClient'
import client from '../graphql/config'
import { IClient } from '@/types/types'
import { gql } from '@apollo/client'

export const getClientFn = async (_id: string): Promise<IClient> => {
  client.cache.reset()
  return (await client.query({ query: gql(getClient), variables: { _id } })).data.getClient as IClient
}
