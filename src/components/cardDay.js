import { formatDate } from "../utils/formatDate"

export const CardDay = ({ dt, icon, min, max, weather }) => {
  return (
    <div className="ta-center w-60 border">
      <p className="size-16 color-text">{formatDate(dt, true)}</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}.png`}
        alt={weather}
      />
      <div className="d-flex justify-center flex-column-s">
        <p className="size-14">{max} <span className="v-align-top">&#176;</span></p>
        <p className="color-text-neutral size-14 m-0-s ml-4">{min}<span className="v-align-top">&#176;</span></p>
      </div>
    </div>
  )
}