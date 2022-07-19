import Qr from '@/components/Qr'
import { getShoppingCardFn } from '@/services/shoppingCar'
import { IService } from '@/types/interfaces/services/Services.interface'
import { IShoppingCard, statusShoppingCard } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IClient } from '@/types/types'
import { download_qr } from '@/utils/QR_utils'
import { DownloadOutlined } from '@ant-design/icons'
import { Button, Table, Tooltip } from 'antd'
import { $security } from 'config'
import * as cookie from 'cookie'
import jwt from 'jsonwebtoken'
import moment from 'moment-timezone'
import { GetServerSidePropsContext } from 'next'
import Layout from '../../components/Layout'
import numeral from 'numeral'
const reserve = ({ shoppingCar }: { shoppingCar: IShoppingCard }) => {
  const price = shoppingCar?.services?.map(e => (e.service as IService)?.price).reduce((a, b) => a + b)
  return (
    <Layout>
      <div className=" flex w-full h-96 pt-12">
        <div className="Informatio_Resume_QR w-1/2 h-auto pt-6">
          <h1 className=" w-full text-center font-bold text-xl">Resumen de tu reserva</h1>
          <div className="pt-6 w-full  flex">
            <div className="Titles font-bold text-left w-1/2 ">
              <p> Fecha de la reserva:</p>
              <p> Tiempo estimado de la reserva:</p>
            </div>
            <div className="Titles text-left w-1/2">
              <p>{` ${moment(shoppingCar.services[0].day)
                .set('hours', parseInt(shoppingCar.services[0].hour?.split(':')[0] as string))
                .set('minutes', parseInt(shoppingCar.services[0].hour?.split(':')[1] as string))
                .format('DD/MM/YYYY hh:mm a')}`}</p>
              <p>{` ${shoppingCar?.services.map(e => (e.service as IService).serviceTime).reduce((a, b) => a + b)} min`}</p>
            </div>
          </div>
          <h1 className="pt-6 font-bold pb-6">Servicios en reserva:</h1>
          <Table
            dataSource={shoppingCar.services}
            columns={[
              {
                title: 'Servicio',
                dataIndex: 'service',
                render: (value: IService) => value.name
              },
              {
                title: 'Staffer',
                dataIndex: 'staff',
                render: (value: IStaff) => `${value.name} ${value.lastName}`
              },
              {
                title: 'Duración (min)',
                dataIndex: 'service',
                render: (value: IService) => value.serviceTime
              },
              {
                title: 'Precio',
                dataIndex: 'service',
                render: (value: IService) => `Q${numeral(value.price).format('0,0')}`
              }
            ]}
          />
        </div>
        <div className="Informatio_QR w-1/2 h-auto ">
          <p className=" w-full text-center font-bold text-xl pt-6 ">Información de pago:</p>

          <p className=" w-full text-left pt-12 ">{`Tu pago fue ${shoppingCar.status === statusShoppingCard.PAYED ? 'Aceptado' : 'Rechazado'}`}</p>
          <div className="w-full flex">
            <div className=" w-4/6 flex">
              <div className="w-1/2 h-full ">
                {shoppingCar.status === statusShoppingCard.PAYED && <p>Pago recibido:</p>}
                {shoppingCar.status === statusShoppingCard.PAYED && <p>Valor pagado de reserva</p>}
                {shoppingCar.status === statusShoppingCard.PAYED && <p>Saldo a pagar por servicios</p>}
                {shoppingCar.status === statusShoppingCard.PAYED && <p>Pagado por medio de tarjeta:</p>}
              </div>
              <div className="w-1/2 h-full ">
                {shoppingCar.status === statusShoppingCard.PAYED && <p>{`${moment().format('DD/MM/YYYY hh:mm a')}`}</p>}
                {shoppingCar.status === statusShoppingCard.PAYED && <p>{` Q${numeral(price * 0.15).format('0,0')}`}</p>}
                {shoppingCar.status === statusShoppingCard.PAYED && <p>{` Q${numeral(price * 1).format('0,0')}`}</p>}
                {shoppingCar.status === statusShoppingCard.PAYED && <p>{` **** **** **** 5280`}</p>}
              </div>
            </div>
            <div className="w-2/6 pt-6 pl-4">
              <Qr id={'inputCode'} value={`${shoppingCar?._id as string}`} />
              <Tooltip title="Descargar código">
                <Button type="primary" onClick={() => download_qr('inputCode', `reserva`)} style={{ margin: '10px' }} icon={<DownloadOutlined />} />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default reserve
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const token = ctx?.req?.headers?.cookie
  if (!ctx.query.id) {
    return {
      notFound: true
    }
  }
  if (token) {
    if (cookie.parse(token).authIpassClient) {
      const { data } = jwt.verify(cookie.parse(token).authIpassClient, $security.secretKey) as { data: IClient }
      if (!data) {
        return {
          notFound: true
        }
      }
      const shoppingCar = await getShoppingCardFn(ctx.query.id as string)
      return { props: { test: 'ok', shoppingCar } }
    }
  } else {
    return {
      notFound: true
    }
  }
}
