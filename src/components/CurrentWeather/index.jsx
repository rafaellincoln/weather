export default function CurrentWeather ({ icon, temp, weather, rain, humidity, wind }) {
  return (
    <div className="center mh-20">
      <div className="d-flex align-item-center mr-32">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={weather}
        />
        <p className="size-64 lh-9">
          {~~temp} <span className="size-16 v-align-top ml--10">&#8451;</span>
        </p>
      </div>
      <div>
        <p>Chuva: {rain}%</p>
        <p>Umidade: {humidity}%</p>
        <p>Vento: {~~wind} km/h</p>
      </div>
    </div>
  )
}
