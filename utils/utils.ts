import { IContact } from '@/types/interfaces/Contact/Contact.interface'
import { FilterType } from '@/types/interfaces/graphqlTypes'
import { ILocationEntries, typeUser } from '@/types/interfaces/ILocationEntries/LocationEntries.interface'
import { IUser } from '@/types/interfaces/user/User.interface'
import { basicTable } from '@/types/typeTemplate'
import { ModalProps } from 'antd'
import moment, { MomentInput, Moment } from 'moment-timezone'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { $security } from 'config'
import { ICards } from '@/types/types'

export const capitalize = (s: string | undefined): string => {
  if (typeof s !== 'string') {
    return ''
  }
  s = s.toLowerCase()
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const convertTotable = <T extends basicTable>(items: T[]): T[] => {
  const newItem: T[] = JSON.parse(JSON.stringify([...items]))
  newItem.map(e => (e.key = e._id))
  return newItem.reverse()
}
export const CommonPropsModal: ModalProps = {
  footer: null,
  width: '80%',
  centered: true,
  destroyOnClose: true
}
export const convertTotableOne = <T extends basicTable>(items: T): T => {
  const newItem: T = JSON.parse(JSON.stringify(items))
  newItem.key = newItem._id
  return newItem
}

export const getTime = (dateTime: MomentInput): string => {
  const time = moment.tz(dateTime, 'America/Guatemala')
  return time.locale('es').format('DD/MM/YYYY, h:mm a')
}

export const formatFiltersTable = (filters: FilterType) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return (
    Object.keys(filters)
      /*eslint-disable*/
      //@ts-ignore
      .map(key => filters[key] && { [key]: filters[key][0] })

      .filter(e => e)
    /*eslint-enable*/
  )
}

export const disabledDateFn = (current: Moment) => {
  return current && current < moment().startOf('day')
}

export const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
export const perNames = ['Super_admin', 'super_anfitrion', 'admin']

export enum perNamesEnum {
  'Super_admin' = 'Super_admin',
  'super_anfitrion' = 'super_anfitrion',
  'admin' = 'admin'
}

export const getFormatData = (data: ILocationEntries[]): any[] =>
  data.map(e => ({
    key: e._id,
    type: e.type as 'I' | 'R' | 'V',
    name: e.type === 'I' ? ((e.contact as IContact)?.firstName as string) : ((e.host as IUser)?.name as string),
    lastName: e.type === 'I' ? ((e.contact as IContact)?.lastName as string) : ((e.host as IUser)?.lastName as string),
    hourIn: e.hourIn as string,
    event: e.event as string,
    host: e.host as string,
    contact: e.contact as string
  }))

export const getFormatDataOne = (data: ILocationEntries): any => ({
  key: data._id,
  type: data.type as typeUser,
  name: data.type === 'I' ? (data.contact as IContact).firstName : (data.host as IUser).name,
  lastName: data.type === 'I' ? (data.contact as IContact).lastName : (data.host as IUser).lastName,
  hourIn: data.hourIn as string,
  event: data.event,
  host: data.host,
  contact: data.contact
})

export const getSex = (sex: string): string => {
  const sexs = {
    Masculino: 'Masculino',
    masculino: 'Masculino',
    Male: 'Masculino',
    male: 'Masculino',
    M: 'Masculino',
    m: 'Masculino',
    Femenino: 'Femenino',
    femenino: 'Femenino',
    Female: 'Femenino',
    female: 'Femenino',
    F: 'Femenino',
    f: 'Femenino'
  }
  const isValid =
    sex === 'Masculino' ||
    sex === 'masculino' ||
    sex === 'Male' ||
    sex === 'male' ||
    sex === 'M' ||
    sex === 'm' ||
    sex === 'Femenino' ||
    sex === 'femenino' ||
    sex === 'Female' ||
    sex === 'female' ||
    sex === 'F' ||
    sex === 'f'

  if (!isValid) {
    return 'Desconocido'
  }

  return sexs[sex]
}

export const removeNullObjValues = (value: object) => Object.fromEntries(Object.entries(value).filter(([_, v]) => v != null))

export const encryptValues = (data: object): string => {
  const resizedIV = Buffer.allocUnsafe(16)
  const iv = crypto.createHash('sha256').update('myHashedIV').digest()
  iv.copy(resizedIV)
  const stringedData = JSON.stringify(data)
  const key = crypto
    .createHash('sha256')
    .update(process.env.NEXT_PUBLIC_CARD || 'test')
    .digest()
  const cipher = crypto.createCipheriv('aes256', key, resizedIV)
  const msg = []
  const myStringed = []
  for (let k = 0; k < stringedData.length; k++) {
    myStringed.push(stringedData[k])
  }
  myStringed.forEach(phrase => {
    msg.push(cipher.update(phrase, 'binary', 'hex'))
  })

  msg.push(cipher.final('hex'))
  const joinedMsg = msg.join('')
  const base = Buffer.from(joinedMsg).toString('base64')
  const createdJwt = jwt.sign({ data: base }, process.env.CARD_SECRET || $security.card, { expiresIn: '120s' })
  return createdJwt
}

export const decodeValues = (data: string): ICards[] => {
  //https://nodejs.org/en/knowledge/cryptography/how-to-use-crypto-module/
  const resizedIV = Buffer.allocUnsafe(16)
  const iv = crypto.createHash('sha256').update('myHashedIV').digest()
  iv.copy(resizedIV)

  const { data: decodedJwt } = jwt.verify(data, process.env.CARD_SECRET || $security.card) as { data: string[] }
  const allValues = []
  for (let k = 0; k < decodedJwt.length; k++) {
    const decode = [Buffer.from(decodedJwt[k], 'base64').toString('utf-8')]
    const key = crypto
      .createHash('sha256')
      .update(process.env.NEXT_PUBLIC_CARD || 'test')
      .digest()
    const decipher = crypto.createDecipheriv('aes256', key, resizedIV)
    const msg = []
    decode.forEach(function (phrase) {
      msg.push(decipher.update(phrase, 'hex', 'binary'))
    })
    msg.push(decipher.final('binary'))
    const joinedMsg = msg.join('')
    allValues.push(JSON.parse(joinedMsg) as ICards)
  }

  return allValues
}
