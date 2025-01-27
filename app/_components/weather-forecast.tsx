'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Container } from './common/container'

type Props = {
  request: {
    type: string
    query: string
    language: string
    unit: string
  }
  location: {
    name: string
    country: string
    region: string
    lat: string
    lon: string
    timezone_id: string
    localtime: string
    localtime_epoch: number
    utc_offset: string
  }
  current: {
    observation_time: string
    temperature: number
    weather_code: number
    weather_icons: string[]
    weather_descriptions: string[]
    wind_speed: number
    wind_degree: number
    wind_dir: string
    pressure: number
    precip: number
    humidity: number
    cloudcover: number
    feelslike: number
    uv_index: number
    visibility: number
    is_day: string
  }
}

export function WeatherForecast() {
  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  }>()
  const [weather, setWeather] = useState<Props>()
  const [error, setError] = useState('')

  useEffect(() => {
    // Obter geolocalização ao carregar a página
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({ latitude, longitude })
      },
      (err) => {
        console.error(err)
        setError('Não foi possível obter sua localização.')
      }
    )
  }, [])

  useEffect(() => {
    // Buscar o clima assim que tivermos a localização
    const fetchWeather = async () => {
      if (location) {
        try {
          const response = await fetch(
            `http://api.weatherstack.com/current?access_key=dd57110817eff96d3da0cea96816bda3&query=${location.latitude},${location.longitude}`,
            { cache: 'force-cache', next: { revalidate: 86200 } }
          )
          if (!response.ok) {
            throw new Error('Erro ao buscar os dados do tempo.')
          }
          const data = await response.json()
          setWeather(data)
        } catch (err) {
          console.error(err)
          setError('Erro ao buscar os dados do tempo.')
        }
      }
    }
    fetchWeather()
    // setWeather({
    //   request: {
    //     type: 'LatLon',
    //     query: 'Lat -21.55 and Lon -48.83',
    //     language: 'en',
    //     unit: 'm'
    //   },
    //   location: {
    //     name: 'Itapolis',
    //     country: 'Brazil',
    //     region: 'Sao Paulo',
    //     lat: '-21.583',
    //     lon: '-48.767',
    //     timezone_id: 'America/Sao_Paulo',
    //     localtime: '2025-01-27 09:33',
    //     localtime_epoch: 1737970380,
    //     utc_offset: '-3.0'
    //   },
    //   current: {
    //     observation_time: '12:33 PM',
    //     temperature: 22,
    //     weather_code: 176,
    //     weather_icons: [
    //       'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0009_light_rain_showers.png'
    //     ],
    //     weather_descriptions: ['Patchy rain nearby'],
    //     wind_speed: 8,
    //     wind_degree: 24,
    //     wind_dir: 'NNE',
    //     pressure: 1014,
    //     precip: 0,
    //     humidity: 92,
    //     cloudcover: 77,
    //     feelslike: 22,
    //     uv_index: 4,
    //     visibility: 10,
    //     is_day: 'yes'
    //   }
    // })
  }, [location])

  if (error) return null

  return (
    <Container className="flex flex-row items-center justify-end space-x-1 py-1 text-[10px]">
      {!location && !error && <p>Obtendo localização...</p>}
      {weather && (
        <>
          <p className="font-semibold tracking-widest">
            {[weather.location.name, weather.location.region].join(', ')}:{' '}
            {weather.current.temperature}°C
          </p>
          <Image
            src={weather.current.weather_icons[0]}
            alt="Tempo"
            width={20}
            height={20}
          />
          {/* <p>Clima: {weather.weather[0].description}</p> */}
        </>
      )}
    </Container>
  )
}
