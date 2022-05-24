import { graphqlFile, uploadedFile } from '..'
import { IServiceType } from '../ServiceType/serviceType.interface'
import { IStaff } from '../staff/staff.interface'
import { ISubService } from '../SubServices/SubServices.interface'
import { IProduct } from '../Product/Product.interface'

export type IProducts = {
  product: IProduct | string
  productQuantity: number
}
export interface IService {
  _id?: string
  plus: boolean
  abbreviation: string
  name: string
  type: IServiceType | string
  products: IProducts[]
  photo: uploadedFile | graphqlFile
  eta: string
  price: number
  cost: number
  serviceFee: number
  taxes: number
  discounts: number
  serviceTime: number
  returnTime: number
  sex: string
  subService: ISubService[] | string[]
}

export interface IServiceStaffer {
  staff: string | IStaff
  service: string | IService
}

export type availableHours = {
  service: IService
  staffer: IStaff
  hour: string
}
