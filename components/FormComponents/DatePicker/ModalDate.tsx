import moment, { Moment } from 'moment'
import React, { useEffect, useState } from 'react'
import 'moment/locale/es'
const ModalDate = ({
  showDatePicker,
  setShowDatePicker,
  datePickerValue,
  setDatePickerValue
}: {
  showDatePicker: boolean
  datePickerValue: Moment | undefined
  setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>
  setDatePickerValue: React.Dispatch<React.SetStateAction<Moment | undefined>>
}) => {
  const MONTH_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const DAYS = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
  const [month, setMonth] = useState(0)
  const [year, setYear] = useState(0)
  const [no_of_days, setNo_of_days] = useState<number[]>([])
  const [blankdays, setBlankdays] = useState<number[]>([])

  const initDate = () => {
    let today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    setMonth(month)
    setYear(year)
  }

  const isToday = (day: number) => moment(datePickerValue).isSame(moment({ day, month, year }), 'days')

  const getDateValue = (day: number) => {
    setDatePickerValue(moment({ year, month, day }))
    setShowDatePicker(false)
  }

  const getNoOfDays = () => {
    let daysInMonth = new Date(year, month + 1, 0).getDate()

    // find where to start calendar day of week
    let dayOfWeek = new Date(year, month).getDay()
    let blankdaysArray = []
    for (var i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i)
    }

    let daysArray = []
    for (var i = 1; i <= daysInMonth; i++) {
      daysArray.push(i)
    }
    setBlankdays(blankdaysArray)
    setNo_of_days(daysArray)
  }

  useEffect(() => {
    initDate()
    getNoOfDays()
  }, [])

  useEffect(() => {
    getNoOfDays()
  }, [month])

  return (
    <div
      className="bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0"
      style={{ width: '17rem', display: showDatePicker ? 'initial' : 'none' }}
    >
      <div className="flex justify-between items-center mb-2">
        <div>
          <span className="text-lg font-bold text-gray-800">{MONTH_NAMES[month]}</span>
          <span className="ml-1 text-lg text-gray-600 font-normal">{year}</span>
        </div>
        <div>
          <button
            type="button"
            className={`transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full`}
            onClick={() => {
              if (month === 0) {
                setMonth(11)
                setYear(year - 1)
              } else {
                setMonth(month - 1)
              }
            }}
          >
            <svg className="h-6 w-6 text-gray-500 inline-flex" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            className={`transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full`}
            onClick={() => {
              if (month === 11) {
                setMonth(0)
                setYear(year + 1)
              } else {
                setMonth(month + 1)
              }
            }}
          >
            <svg className="h-6 w-6 text-gray-500 inline-flex" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap mb-3 -mx-1">
        {DAYS.map(el => (
          <div style={{ width: '14.26%' }} className="px-1">
            <div className="text-gray-800 font-medium text-center text-xs">{el}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap -mx-1">
        {blankdays.map(el => (
          <div style={{ width: '14.28%' }} className="text-center border p-1 border-transparent text-sm"></div>
        ))}
        {no_of_days.map(el => (
          <div style={{ width: '14.28%' }} className="px-1 mb-1">
            <div
              onClick={() => getDateValue(el)}
              className={`cursor-pointer text-center text-sm leading-none rounded-full leading-loose transition ease-in-out duration-100
              ${isToday(el) ? 'bg-gold text-white' : 'text-gray-700 hover:bg-blue-200'}
              `}
            >
              {el}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ModalDate
