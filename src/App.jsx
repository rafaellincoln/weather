import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { capitalize } from './utils/capitalize';
import {
  Alert,
  Button,
  ChartHourly,
  CurrentWeather,
  Header,
  Spinner,
  WeatherDay
} from './components'
import { useGeoLocation } from './hooks/useGeoLocation';
import './App.css';

const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

const App = () => {
  const [weather, setWeather] = useState()
  const [loading, setLoading] = useState(false)

  const [error, geoLocation] = useGeoLocation()
  
  const getWeather = useCallback(async () => {
    if (!geoLocation) {
      return
    }

    const { latitude: lat, longitude: lon } = geoLocation
    const params = {
      lat,
      lon,
      units: 'metric',
      lang: 'pt_br',
      appid: process.env.REACT_APP_API_WEATHER,
    }

    const { data: current } = await instance.get('/weather', { params })

    const { data: onecall } = await instance.get('/onecall', { params })

    setWeather({ current, onecall })
  }, [geoLocation])

  const updateWeather = useCallback(async () => {
    setLoading(true)
    await getWeather()
    setLoading(false)
  }, [getWeather])

  useEffect(getWeather, [getWeather, geoLocation])

  if (error) {
    return (
      <>
        <h2>{error}</h2>
        <h3>Atualize a pagina e tente novamente!</h3>
      </>
    )
  }

  if (!geoLocation || !weather || loading) {
    return <Spinner />
  }

  return (
    <>
      <Header
        city={weather?.current.name}
        country={weather?.current.sys.country}
        currentDate={weather?.current.dt}
        weather={capitalize(weather?.current.weather[0].description)}
      />
      <CurrentWeather
        icon={weather?.current.weather[0].icon}
        weather={weather?.current.weather[0].description}
        temp={weather?.current.main.temp}
        humidity={weather?.current.main.humidity}
        rain={weather?.current.clouds.all}
        wind={weather?.current.wind.speed * 3.6}
      />
      <ChartHourly
        hourly={weather?.onecall.hourly || []}
      />
      <WeatherDay
        daily={weather?.onecall.daily}
      />
      <Alert
        alerts={weather?.onecall.alerts}
      />
      <Button onClick={updateWeather}>Atualizar</Button>
    </>
  );
}

export default App