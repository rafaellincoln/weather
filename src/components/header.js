import { formatDate } from "../utils/formatDate"

export const Header = ({ city, country, currentDate, weather, update }) => {
  return (
    <header className="mh-20">
      <div className="d-flex flex-row justify-between">
        <div>
          <h1 className="color-text size-24">{city}, {country}</h1>
          <p className="color-text size-16">{formatDate(currentDate)}</p>
          <p className="color-text size-16">{weather}</p>
        </div>
        <div>
          <button onClick={update}>Atualizar</button>
        </div>
      </div>
    </header>
  )
}