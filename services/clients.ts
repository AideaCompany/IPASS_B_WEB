import { getClient } from '../graphql/Client/queries/getClient'
import client from '../graphql/config'

import { gql } from '@apollo/client'
import { sendCode } from '../graphql/Client/mutations/sendCode'
import { loginClient } from '../graphql/Client/mutations/loginClient'

import { updateClient } from '@/graphql/Client/mutations/updateClient'
import { IUpdateClient } from '@/types/interfaces/Clients/MutationClient.interface'
import { createCard } from '@/graphql/Client/mutations/createCard'
import { listClientCards } from '@/graphql/Client/queries/listClientCards'
import { deleteCard } from '@/graphql/Client/mutations/deleteCard'
import { generateTransferSessionToWeb } from '@/graphql/Client/mutations/generateTransferSessionToWeb'
import { IClient } from '@/types/interfaces/Clients/client.interface'

export const getClientFn = async (_id: string): Promise<IClient> => {
  client.cache.reset()
  return (await client.query({ query: gql(getClient), variables: { _id } })).data.getClient as IClient
}

export const listClientCardsFn = async (_id: string): Promise<string> => {
  client.cache.reset()
  return (await client.query({ query: gql(listClientCards), variables: { _id } })).data.listClientCards
}

export const sendCodeFn = async (input: any): Promise<boolean> => {
  client.cache.reset()
  return (await client.mutate({ mutation: gql(sendCode), variables: { input } })).data.sendCode
}

export const loginClientFn = async (token: string) => {
  return (await client.mutate({ mutation: gql(loginClient), variables: { token } })).data.loginClient
}

export const updateClientFn = async (input: IUpdateClient): Promise<boolean> => {
  client.cache.reset()
  return (await client.mutate({ mutation: gql(updateClient), variables: { input } })).data.updateClient
}

export const createCardFn = async (id: string, card: string): Promise<boolean> => {
  client.cache.reset()
  return (await client.mutate({ mutation: gql(createCard), variables: { id, card } })).data.createCard
}

export const deleteCardFn = async (id: string, card: string): Promise<boolean> => {
  client.cache.reset()
  return (await client.mutate({ mutation: gql(deleteCard), variables: { id, card } })).data.deleteCard
}

export const generateTransferSessionToWebFn = async (id: string): Promise<string> => {
  client.cache.reset()
  return (await client.mutate({ mutation: gql(generateTransferSessionToWeb), variables: { id } })).data.generateTransferSessionToWeb
}
