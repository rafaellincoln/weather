import { formatDate } from "../../utils/formatDate"

export default function Header ({ city, country, currentDate, weather, update }) {
  return (
    <header className="mh-20 center flex-column">
      <h1 className="color-title size-24">{city}, {country}</h1>
      <p className="color-text size-16">{formatDate(currentDate)}</p>
      <p className="color-text size-16">{weather}</p>
    </header>
  )
}
