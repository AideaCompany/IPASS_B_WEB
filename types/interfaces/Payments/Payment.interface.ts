import { basicTable } from '@/types/typeTemplate'
import { IClient } from '../Clients/client.interface'
import { IShoppingCard } from '../shoppingCard/shoppingCard.interface'

export interface IPayment extends basicTable {
  client: IClient | string
  ShoppingCard: IShoppingCard | string
  status: StatusPayment
  card: string
}

export enum StatusPayment {
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  WAITING_PAYMENT = 'WAITING_PAYMENT'
}

export type respPayment = { idTransaction: string; status: StatusPayment }
