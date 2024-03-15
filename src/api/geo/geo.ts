import { api } from '../api'
import { GetLocationResponseModel } from './model'
import { AxiosResponse } from 'axios'

export const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
export const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/'

export const geoApi = {
  'options': (
    inputValue: string,
    options: any,
  ): Promise<AxiosResponse<GetLocationResponseModel>> => {
    return api.get<GetLocationResponseModel>(
      `cities?minPopulation=300000&namePrefix=${inputValue}`,
      options,
    )
  },
}
