import React from 'react'
import { useForm } from 'react-hook-form'

import { fetchWeatherForCity, WeatherData } from '../services/WeatherService'

import WeatherDisplay from '../components/WeatherDisplay'
import Avatar from '../components/Avatar'

const euCapitals: string[] = [
  'Vienna', 'Brussels', 'Sofia', 'Zagreb', 'Nicosia', 'Prague', 'Copenhagen', 
  'Tallinn', 'Helsinki', 'Paris', 'Berlin', 'Athens', 'Budapest', 'Dublin', 
  'Rome', 'Riga', 'Vilnius', 'Luxembourg', 'Valletta', 'Amsterdam', 
  'Warsaw', 'Lisbon', 'Bucharest', 'Bratislava', 'Ljubljana', 'Madrid', 
  'Stockholm', 'Helsinki'
]

interface FormInputs {
  city: string
}

function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()
  const [weather, setWeather] = React.useState<WeatherData | null>(null)
  const userEmail = localStorage.getItem('userEmail') || 'User'

  const onSubmit = async (data: FormInputs) => {
    const weatherData = await fetchWeatherForCity(data.city)

    setWeather(weatherData)
  }

  const validateCity = (city: string) => euCapitals.includes(city)

  return (
    <div className="Home">
      <div className="Home__heading">
        <Avatar email={userEmail} />
      </div>

      <div className="Home__widget-wrapper">
        <h1 className="Home__widget-title">Weather widget</h1>

        <form
          className="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <input
              required
              type="text"
              placeholder="Enter an EU capital city"
              {...register('city', { 
                validate: validateCity,
                required: 'City is required'
              })}
              className={`form__field ${errors.city ? 'form__field_invalid' : ''}`}
            />

            {errors.city && (
              <p className="error">
                {errors.city.type === 'validate' ? 'Please enter a valid EU capital city.' : errors.city.message}
              </p>
            )}
          </div>

          <button type="submit" className="form__button" disabled={!!errors.city}>Get Weather</button>
        </form>

        {weather && <WeatherDisplay weather={weather} />}
      </div>
    </div>
  )
}

export default Home
