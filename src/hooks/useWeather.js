import { useState, useEffect } from 'react'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

export const useWeather = (lat, lon) => {
  const [weather, setWeather] = useState()

  useEffect(() => {
    const getWeather = async () => {
      if (!lat || !lon) {
        return
      }

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
    }

    getWeather()
  }, [lat, lon])

  return weather
}