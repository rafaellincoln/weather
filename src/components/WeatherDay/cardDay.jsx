import { formatDate } from "../../utils/formatDate"

export function CardDay ({ dt, icon, min, max, weather }) {
  return (
    <div className="center ta-center w-100 border">
      <p className="size-16 color-text">{formatDate(dt, true)}</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}.png`}
        alt={weather}
      />
      <p className="center size-14">
        min: {min}<span className="v-align-top">&#176;</span>&emsp;
        max: {max} <span className="v-align-top">&#176;</span>
      </p>
    </div>
  )
}