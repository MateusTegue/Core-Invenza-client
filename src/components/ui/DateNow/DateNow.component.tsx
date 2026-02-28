"use client"

import { useEffect, useState } from "react"
import { CalendarIcon } from "@/assets/icons"
import { getWeatherDate } from "@/api/weatherdate.api"
import { WeatherResponse } from "@/constants/models"


const DateNow = () => {
  const [now, setNow] = useState(new Date())
  const [weather, setWeather] = useState<WeatherResponse | null>(null)
  const [isLoadingWeather, setIsLoadingWeather] = useState(true)
  const [weatherError, setWeatherError] = useState<string | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoadingWeather(true)
        setWeatherError(null)
        const response = await getWeatherDate()
        setWeather((response ?? null) as WeatherResponse | null)
      } catch {
        setWeatherError("No se pudo cargar el clima.")
        setWeather(null)
      } finally {
        setIsLoadingWeather(false)
      }
    }

    void fetchWeather()
    const weatherTimer = setInterval(() => {
      void fetchWeather()
    }, 60000)

    return () => clearInterval(weatherTimer)
  }, [])

  const dayLabel = new Intl.DateTimeFormat("es-CO", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(now)

  const timeLabel = new Intl.DateTimeFormat("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now)

  const weatherInfo = weather?.weather?.[0]
  const cityName = weather?.name ?? "Sin ciudad"
  const temp = weather?.main?.temp
  const humidity = weather?.main?.humidity
  const windSpeed = weather?.wind?.speed
  const description = weatherInfo?.description ?? weatherInfo?.main ?? "Sin datos"
  const iconCode = weatherInfo?.icon
  const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : null

  return (
    <div className="space-y-1">
      <div className="rounded-lg border bg-white px-4 py-2 text-right shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-md tracking-wide text-muted-foreground">Fecha actual</p>
          <CalendarIcon width={24} height={24} fill="currentColor" />
        </div>
        <p className="text-sm font-medium capitalize">{dayLabel}</p>
        <p className="text-lg font-semibold tabular-nums">{timeLabel}</p>
      </div>

      <div className="rounded-lg border bg-white px-4 py-2 shadow-sm">
        <p className="text-sm font-semibold">Clima</p>
        <div className="mt-2 min-h-[120px]">
          {isLoadingWeather && (
            <div className="space-y-2 animate-pulse">
              <div className="h-4 w-3/4 rounded bg-muted" />
              <div className="h-4 w-1/2 rounded bg-muted" />
              <div className="h-4 w-2/3 rounded bg-muted" />
              <div className="h-4 w-1/3 rounded bg-muted" />
            </div>
          )}

          {!isLoadingWeather && weatherError && (
            <p className="text-sm text-destructive">{weatherError}</p>
          )}

          {!isLoadingWeather && !weatherError && (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {iconUrl && (
                  <img src={iconUrl} alt={description} className="h-8 w-8" />
                )}
                <p className="text-sm font-medium capitalize">
                  {cityName} - {description}
                </p>
              </div>
              <p className="text-sm">
                Temperatura: {typeof temp === "number" ? `${temp.toFixed(1)} C` : "No disponible"}
              </p>
              <p className="text-sm">
                Humedad: {typeof humidity === "number" ? `${humidity}%` : "No disponible"}
              </p>
              <p className="text-sm">
                Viento: {typeof windSpeed === "number" ? `${windSpeed} m/s` : "No disponible"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DateNow
