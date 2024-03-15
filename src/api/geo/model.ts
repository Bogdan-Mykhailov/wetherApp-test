interface Clouds {
  all: number
}

interface Coord {
  lon: number
  lat: number
}

interface Main {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

interface Sys {
  type: number
  id: number
  country: string
  sunrise: number
  sunset: number
}

interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

interface Wind {
  speed: number
  deg: number
  gust: number
}

interface City {
  coord: Coord
  country: string
  id: number
  name: string
  population: number
  sunrise: number
  sunset: number
  timezone: number
}

interface ListClouds {
  all: number
}

interface ListMain {
  feels_like: number
  grnd_level: number
  humidity: number
  pressure: number
  sea_level: number
  temp: number
  temp_kf: number
  temp_max: number
  temp_min: number
}

interface ListSys {
  pod: string
}

interface List {
  clouds: ListClouds
  dt: number
  dt_txt: Date
  main: ListMain
  pop: number
  sys: ListSys
  visibility: number
  weather: Weather[]
  wind: Wind
}

export interface ForecastModel {
  city: City
  cnt: number
  cod: string
  list: List[]
  message: number
}

export interface WeatherModel {
  city: string
  base: string
  clouds: Clouds
  cod: number
  coord: Coord
  dt: number
  id: number
  main: Main
  name: string
  sys: Sys
  timezone: number
  visibility: number
  weather: Weather[]
  wind: Wind
}

export interface MetadataModel {
  currentOffset: number
  totalCount: number
}

export interface ResponseDataModel {
  city: string
  country: string
  countryCode: string
  id: number
  latitude: number
  longitude: number
  name: string
  population: number
  region: string
  regionCode: string
  type: string
  wikiDataId: string
}

export interface GetLocationResponseModel {
  data: ResponseDataModel[]
  metaData: MetadataModel
}
