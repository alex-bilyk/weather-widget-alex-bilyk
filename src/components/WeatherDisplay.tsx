import React from 'react'

import { WeatherData, Forecast } from '../services/WeatherService'

interface WeatherForecastDisplayProps {
  forecast: Forecast
}

const WeatherForecastDisplay: React.FC<WeatherForecastDisplayProps> = ({ forecast }) => (
  <div className="WeatherDisplay__list__item">
    <h3 className="WeatherDisplay__list__item__date">{forecast.date}</h3>

    {forecast.morning && <p className="WeatherDisplay__list__item__value">Morning: {forecast.morning}</p>}
    {forecast.afternoon && <p className="WeatherDisplay__list__item__value">Afternoon: {forecast.afternoon}</p>}
    {forecast.evening && <p className="WeatherDisplay__list__item__value">Evening: {forecast.evening}</p>}
    {forecast.night && <p className="WeatherDisplay__list__item__value">Night: {forecast.night}</p>}
  </div>
)

interface WeatherDisplayProps {
  weather: WeatherData
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  return (
    <div className="WeatherDisplay">
      <h2 className="WeatherDisplay__title">Weather in {weather.city}</h2>

      <div className="WeatherDisplay__list">
        {weather.forecast.map((dayForecast, index) => (
          <WeatherForecastDisplay key={index} forecast={dayForecast} />
        ))}
      </div>

    </div>
  )
}

export default WeatherDisplay
