import client from '@/graphql/config'
import { addShoppingCard } from '@/graphql/shoppingCar/mutation/addShoppingCard'
import { updateShoppingCardService } from '@/graphql/shoppingCar/mutation/updateShoppingCardService'
import { validateShoppingCard } from '@/graphql/shoppingCar/mutation/validateShoppingCard'
import { getClientCurrentShoppingCard } from '@/graphql/shoppingCar/queries/getClientCurrentShoppingCard'
import { getClientShoppingCards } from '@/graphql/shoppingCar/queries/getClientShoppingCards'
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
