import { basicTable } from '@/types/typeTemplate'
import { graphqlFile, uploadedFile } from '..'

export interface IServiceType extends basicTable {
  name: string
  logo: graphqlFile | uploadedFile
  description: string
}
