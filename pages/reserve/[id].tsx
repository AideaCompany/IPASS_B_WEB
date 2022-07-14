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
      <div>
        <h1>Resumen de tu reserva</h1>
        <p>{`Fecha de la reserva: ${moment(shoppingCar.services[0].day)
          .set('hours', parseInt(shoppingCar.services[0].hour?.split(':')[0] as string))
          .set('minutes', parseInt(shoppingCar.services[0].hour?.split(':')[1] as string))
          .format('DD/MM/YYYY hh:mm a')}`}</p>
        <p>{`Tiempo estimado de reserva: ${shoppingCar?.services.map(e => (e.service as IService).serviceTime).reduce((a, b) => a + b)} min`}</p>
        <h1>Servicios en reserva:</h1>
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
        <p>Información de pago:</p>
        <p>{`Tu pago fue ${shoppingCar.status === statusShoppingCard.PAYED ? 'Aceptado' : 'Rechazado'}`}</p>
        {shoppingCar.status === statusShoppingCard.PAYED && <p>{`Pago recibido: ${moment().format('DD/MM/YYYY hh:mm a')}`}</p>}
        {shoppingCar.status === statusShoppingCard.PAYED && <p>{`Valor pagado de reserva: Q${numeral(price * 0.15).format('0,0')}`}</p>}
        {shoppingCar.status === statusShoppingCard.PAYED && <p>{`Saldo a pagar por servicios: Q${numeral(price * 1).format('0,0')}`}</p>}
        {shoppingCar.status === statusShoppingCard.PAYED && <p>{`Pagado por medio de tarjeta: **** **** **** 5280`}</p>}
        <Qr id={'inputCode'} value={`${shoppingCar?._id as string}`} />
        <Tooltip title="Descargar código">
          <Button type="primary" onClick={() => download_qr('inputCode', `reserva`)} style={{ margin: '10px' }} icon={<DownloadOutlined />} />
        </Tooltip>
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
