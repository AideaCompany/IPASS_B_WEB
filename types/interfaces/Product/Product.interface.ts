import { basicTable } from '@/types/typeTemplate'
import { uploadedFile } from '..'

import { IBrands } from '../Brands/Brands.interface'
import { IService } from '../services/Services.interface'

export interface IProduct extends basicTable {
  name: string
  abbreviation: string
  brand: IBrands | string
  photo: uploadedFile
  productType: string
  price: number
  measureType: string
  amount: number
  services: string[] | IService[]
  designedFor: string
}
