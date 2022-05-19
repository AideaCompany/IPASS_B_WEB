import { Moment } from 'moment-timezone'

export interface IShoppingServiceBasic {
  service?: string
  staff?: string
  hour?: string
  day?: string | Moment
  store?: string
}

export interface ICreateShoppingCard {
  client: string
  services: IShoppingServiceBasic[]
}

export interface IUpdateShoppingCard {
  _id: string
  client: string
  services: IShoppingServiceBasic[]
}
