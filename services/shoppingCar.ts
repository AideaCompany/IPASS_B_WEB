import client from '@/graphql/config'
import { addShoppingCard } from '@/graphql/shoppingCar/mutation/addShoppingCard'
import { deleteShoppingCardService } from '@/graphql/shoppingCar/mutation/deleteShoppingCardService'
import { goPayShoppingCard } from '@/graphql/shoppingCar/mutation/goPayShoppingCard'
import { InvalidateShoppingCard } from '@/graphql/shoppingCar/mutation/InvalidateShoppingCard'
import { makePaymentShoppingCard } from '@/graphql/shoppingCar/mutation/makePaymentShoppingCard'
import { updateShoppingCardService } from '@/graphql/shoppingCar/mutation/updateShoppingCardService'
import { validateShoppingCard } from '@/graphql/shoppingCar/mutation/validateShoppingCard'
import { getClientCurrentShoppingCard } from '@/graphql/shoppingCar/queries/getClientCurrentShoppingCard'
import { getClientCurrentShoppingCardToPay } from '@/graphql/shoppingCar/queries/getClientCurrentShoppingCardToPay'
import { getClientShoppingCards } from '@/graphql/shoppingCar/queries/getClientShoppingCards'
import { getShoppingCard } from '@/graphql/shoppingCar/queries/getShoppingCard'
import { respPayment } from '@/types/interfaces/Payments/Payment.interface'
import { IShoppingServiceBasic } from '@/types/interfaces/shoppingCard/MutationShoppingCard.interface'
import { IShoppingCard } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import { convertTotable } from '@/utils/utils'
import { gql } from '@apollo/client'

export const getClientShoppingCardsFn = async (client_id: string): Promise<IShoppingCard[]> => {
  client.cache.reset()
  const paginated = await (await client.query({ query: gql(getClientShoppingCards), variables: { client: client_id } })).data.getClientShoppingCards
  return convertTotable<IShoppingCard>(paginated)
}

export const getClientCurrentShoppingCardFn = async (client_id: string): Promise<IShoppingCard> => {
  client.cache.reset()
  const paginated = await (
    await client.query({ query: gql(getClientCurrentShoppingCard), variables: { client: client_id } })
  ).data.getClientCurrentShoppingCard
  return paginated
}

export const getClientCurrentShoppingCardToPayFn = async (client_id: string): Promise<IShoppingCard> => {
  client.cache.reset()
  const paginated = await (
    await client.query({ query: gql(getClientCurrentShoppingCardToPay), variables: { client: client_id } })
  ).data.getClientCurrentShoppingCardToPay
  return paginated
}

export const addShoppingCardFn = async (client_id: string, service: IShoppingServiceBasic): Promise<IShoppingCard> => {
  client.cache.reset()
  const paginated = await (await client.mutate({ mutation: gql(addShoppingCard), variables: { client: client_id, service } })).data.addShoppingCard
  return paginated
}

export const updateShoppingCardServiceFn = async (client_id: string, service: string, input: IShoppingServiceBasic): Promise<IShoppingCard> => {
  client.cache.reset()
  const paginated = await (
    await client.mutate({ mutation: gql(updateShoppingCardService), variables: { client: client_id, service, input } })
  ).data.updateShoppingCardService
  return paginated
}

export const validateShoppingCardFn = async (client_id: string): Promise<IShoppingCard> => {
  client.cache.reset()
  const paginated = await (await client.mutate({ mutation: gql(validateShoppingCard), variables: { client: client_id } })).data.validateShoppingCard
  return paginated
}

export const deleteShoppingCardServiceFn = async (client_id: string, service: string): Promise<IShoppingCard> => {
  client.cache.reset()
  return await (
    await client.mutate({ mutation: gql(deleteShoppingCardService), variables: { client: client_id, service } })
  ).data.deleteShoppingCardService
}
export const goPayShoppingCardFn = async (client_id: string): Promise<IShoppingCard> => {
  client.cache.reset()
  const paginated = await (await client.mutate({ mutation: gql(goPayShoppingCard), variables: { client: client_id } })).data.goPayShoppingCard
  return paginated
}

export const InvalidateShoppingCardFn = async (client_id: string): Promise<IShoppingCard> => {
  client.cache.reset()
  const paginated = await (
    await client.mutate({ mutation: gql(InvalidateShoppingCard), variables: { client: client_id } })
  ).data.InvalidateShoppingCard
  return paginated
}

export const makePaymentShoppingCardFn = async (client_id: string, selectedCard: string): Promise<respPayment> => {
  client.cache.reset()
  const paginated = await (
    await client.mutate({ mutation: gql(makePaymentShoppingCard), variables: { client: client_id, selectedCard } })
  ).data.goPayShoppingCard
  return paginated
}

export const getShoppingCardFn = async (_id: string): Promise<IShoppingCard> => {
  client.cache.reset()
  return await (
    await client.query({ query: gql(getShoppingCard), variables: { _id } })
  ).data.getShoppingCard
}
