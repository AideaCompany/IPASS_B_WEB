import { basicTable } from '@/types/typeTemplate'
import { IClient } from '../Clients/client.interface'
import { IService } from '../services/Services.interface'
import { IStaff } from '../staff/staff.interface'
import { IStores } from '../Stores/stores.interface'

export interface IShoppingService {
  _id?: string
  service?: IService | string
  staff?: IStaff | string
  hour?: string
  day?: string
  store?: IStores | string
}

export interface IShoppingCard extends basicTable {
  client: string | IClient
  services: IShoppingService[]
  status: statusShoppingCard
}

export enum statusShoppingCard {
  CURRENT = 'CURRENT',
  DELETED = 'DELETED',
  PAYED = 'PAYED',
  FINISHED = 'FINISHED',
  WAITING_PAYMENT = 'WAITING_PAYMENT'
}
