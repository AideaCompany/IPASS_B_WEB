import { getClient } from '../graphql/Client/queries/getClient'
import client from '../graphql/config'
import { IClient } from '@/types/types'
import { gql } from '@apollo/client'
import { sendCode } from '../graphql/Client/mutations/sendCode'
import { loginClient } from '../graphql/Client/mutations/loginClient'

export const getClientFn = async (_id: string): Promise<IClient> => {
  client.cache.reset()
  return (await client.query({ query: gql(getClient), variables: { _id } })).data.getClient as IClient
}

export const sendCodeFn = async (input: any): Promise<boolean> => {
  client.cache.reset()
  return (await client.mutate({ mutation: gql(sendCode), variables: { input } })).data.sendCode
}

export const loginClientFn = async (token: string) => {
  return (await client.mutate({ mutation: gql(loginClient), variables: { token } })).data.loginClient
}
