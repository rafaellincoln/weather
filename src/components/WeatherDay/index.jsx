import { CardDay } from "./cardDay"

const WeatherDayList = ({ daily = [] }) => {
  return daily.slice(0, 6).map((item) => {
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

export default function WeatherDay ({ daily }) {
  return (
    <div className="d-flex justify-between flex-column mh-20 mw-100 mt-12">
      <WeatherDayList daily={daily} />
    </div>
  )
}
