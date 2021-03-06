import { basicTable } from '@/types/typeTemplate'
import { graphqlFile, uploadedFile } from '..'
import { IService } from '../services/Services.interface'
import { ITimeZone } from '../TimeZone/TimeZone.interface'

export interface IStores extends basicTable {
  name: string
  address: string
  schedule: ITimeZone[] | string[]
  services: IService[] | string[]
  generes: generes[]
  photo: uploadedFile | graphqlFile
  location: { lat: number; lng: number }
  department: string
  city: string
  zone: number
  phone: string
  contact: string
  distance?: number
  reservePercentage: number
}

export enum generes {
  MEN = 'MEN',
  WOMEN = 'WOMEN',
  CHILDREN = 'CHILDREN',
  ALL = 'ALL'
}

export type storeFilter = {
  department: string[]
  city: string[]
  zone: number[]
}
