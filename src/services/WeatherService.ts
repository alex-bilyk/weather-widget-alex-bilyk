export interface Forecast {
  date: string
  morning?: string
  afternoon?: string
  evening?: string
  night: string
}

export interface WeatherData {
  city: string
  forecast: Forecast[]
}

const weatherConditions: string[] = ['Sunny', 'Rainy', 'Cloudy', 'Windy', 'Snowy']

const getRandomCondition = (): string => weatherConditions[Math.floor(Math.random() * weatherConditions.length)]

export const fetchWeatherForCity = async (city: string): Promise<WeatherData> => {
  const currentHour = new Date().getHours()
  const forecast: WeatherData = {
    city,
    forecast: [
      {
        date: new Date().toISOString().split('T')[0],
        morning: currentHour < 12 ? getRandomCondition() : undefined,
        afternoon: currentHour < 18 ? getRandomCondition() : undefined,
        evening: currentHour < 21 ? getRandomCondition() : undefined,
        night: getRandomCondition(),
      },
      {
        date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
        morning: getRandomCondition(),
        afternoon: getRandomCondition(),
        evening: getRandomCondition(),
        night: getRandomCondition(),
      },
    ],
  }

  return forecast
}
