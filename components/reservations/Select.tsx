import useReservation, { stepsPageReservation } from '@/providers/ReservationContext'
import { IShoppingCard } from '@/types/interfaces/shoppingCard/shoppingCard.interface'
import { Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import moment from 'moment-timezone'
import Button from '../Button'

const Select = ({ history }: { history: IShoppingCard | null }) => {
  const firstService = history?.services[0]
  const { setStep } = useReservation()
  const onClick = () => {
    setStep(stepsPageReservation.staffers)
  }
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`)
  }

  return (
    <div className="Container_select ">
      <div className="Container_fluid ">
        <div className="Container_F_Text relative bg-gradient-to-r from-purple-500 to-pink-500 " onClick={onClick}>
          <img src="/images/Profesional.png" className="mapS-img relative w-11/12 pl-2"></img>
          <p className=" font-Gothic font-bold text-2xl text-white absolute bottom-0 left-10 top-20"> Profesionales</p>
        </div>

        <div className="Container_F_Text relative " onClick={() => setStep(stepsPageReservation.services)}>
          <img src="/images/Servicios.png" className="mapS-img relative w-11/12 pl-2"></img>
          <p className="font-Gothic text-right font-bold text-2xl text-white absolute bottom-0 left-10 top-20"> Servicios</p>
        </div>
      </div>
      <div className="Sale font-Gothic text-left  font-bold pt-20 pl-4">
        <Checkbox onChange={onChange}>Si es tu primera reserva, obtén un 5% de descuento</Checkbox>{' '}
      </div>
      <div className="Container_reservation  flex flex-col space-y-2">
        <p className="Title font-Gothic text-center  font-bold border-b border-color-gray">Reserva màs reciente</p>
        <p className="text-left text-black font-Gothic  ">{`Cantidad de servicios: ${history?.services?.length}`}</p>
        <p className="text-left text-black font-Gothic ">{`Dia de servicios: ${moment
          .tz(firstService?.day as string, 'America/Guatemala')
          .set({ hour: parseInt((firstService?.hour as string)?.split(':')[0]), minute: parseInt((firstService?.hour as string)?.split(':')[1]) })
          .format('DD/MM/YYYY hh:mm a')}`}</p>
        <p className="text-left text-black font-Gothic ">{`Status ${history?.status}`}</p>

        <div className="container_buttons">
          <div className="line  divide-y divide-slate-200"></div>
          <div className="change  ">
            <Button title="Modificar " onClick={onClick} customClassName="button  text-xs" />
          </div>
          <div className="cancel ">
            <Button title="Cancelar" onClick={onClick} customClassName="button  text-xs" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Select
