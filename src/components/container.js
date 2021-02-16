import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import { capitalize } from '../utils/capitalize'

import { Header } from './header';
import { CurrentWeather } from './currentWeather';
import { ChartHourly } from './chartHourly';
import { WeatherDay } from './weatherDay';
import { Alert } from './alert';
import { Spinner } from './spinner';

const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

export const Container = () => {
  const [geoLocation, setGeoLocation] = useState()
  const [weather, setWeather] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  
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

  useEffect(() => {
    const geoLocationError = (err) => {
      const errorMessage = {
        /* eslint-disable no-undef */
        [GeolocationPositionError.PERMISSION_DENIED]: 'Não foi possível obter a informação sobre geolocalização. Permissão Negada!',
        [GeolocationPositionError.POSITION_UNAVAILABLE]: 'A obtenção da geolocalização falhou por que pelo menos uma fonte interna de posicionamento retornou um erro interno',
        [GeolocationPositionError.TIMEOUT]: 'O tempo máximo permitido para obter a geolocalização foi atingido antes de se obter a informação.'
        /* eslint-enable no-undef */
      }

      setError(errorMessage[err.code])
      setGeoLocation(undefined)
    }
    window.navigator.geolocation.getCurrentPosition((position) => {
      setError(undefined)
      setGeoLocation(position.coords)
    }, geoLocationError)
  }, [])

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
        update={updateWeather}
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
    </>
  );
}
