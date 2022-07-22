import useWindowDimensions from 'hooks/useWindowDimensions'
import moment, { Moment } from 'moment-timezone'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import CardDay from './CardDay'

const CarouselSelectDay = ({ onChange }: { onChange: (value: Moment) => void }) => {
  const [daysToShow, setDaysToShow] = useState<Moment[]>([])
  const nameOfDays = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB']
  const [selectedDay, setSelectedDay] = useState(moment().set({ hour: 12, minute: 0, second: 0, millisecond: 0 }))
  useEffect(() => {
    const day = moment().set({ hour: 12, minute: 0, second: 0, millisecond: 0 })
    const firstDay = moment(day).subtract(10, 'day')
    const days = []
    for (let k = 0; k < 20; k++) {
      days.push(moment(firstDay).add(k, 'day'))
    }
    setDaysToShow(days)
  }, [])
  const { width } = useWindowDimensions()
  const [perView, setPerView] = useState(11)
  useEffect(() => {
    if (width < 500) {
      setPerView(6)
    }
    if (width > 500) {
      setPerView(11)
    }
  }, [width])
  return (
    <div className="container_carousel">
      <Swiper slidesPerView={perView} spaceBetween={0} initialSlide={10} centeredSlides={true}>
        {daysToShow.map((e, i) => (
          <SwiperSlide key={i}>
            <CardDay
              onClick={() => {
                onChange(e)
                setSelectedDay(e)
              }}
              isSelected={e.isSame(selectedDay)}
              title={nameOfDays[e.day()]}
              day={e.format('DD')}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CarouselSelectDay
