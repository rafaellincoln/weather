import { CardDay } from "./cardDay"

const WeatherDayList = ({ daily = [] }) => {
  return daily.slice(0, 8).map((item) => {
    return (
      <CardDay
        key={item.dt}
        dt={item.dt}
        icon={item.weather[0].icon}
        max={~~item.temp.max}
        min={~~item.temp.min}
        weather={item.weather[0].description}
      />
    )
  })
}

export const WeatherDay = ({ daily }) => {
  return (
    <div className="d-flex justify-between mh-20 mw-100 gap-10 overflow-x-auto">
      <WeatherDayList daily={daily} />
    </div>
  )
}