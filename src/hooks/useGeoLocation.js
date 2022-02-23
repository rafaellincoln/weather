import { useState, useEffect } from 'react'

export const useGeoLocation = () => {
  const [geoLocation, setGeoLocation] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    const geoLocationError = (err) => {
      const errorMessage = {
        [GeolocationPositionError.PERMISSION_DENIED]: 'Não foi possível obter a informação sobre geolocalização. Permissão Negada!',
        [GeolocationPositionError.POSITION_UNAVAILABLE]: 'A obtenção da geolocalização falhou por que pelo menos uma fonte interna de posicionamento retornou um erro interno',
        [GeolocationPositionError.TIMEOUT]: 'O tempo máximo permitido para obter a geolocalização foi atingido antes de se obter a informação.'
      }

      setError(errorMessage[err.code])
      setGeoLocation(undefined)
    }

    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        setError(undefined)
        setGeoLocation(position.coords)
      }, geoLocationError)
    }
  }, [])

  return [error, geoLocation]
}