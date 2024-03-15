import axios from 'axios'

export const api = axios.create( {
  'baseURL': 'https://wft-geo-db.p.rapidapi.com/v1/geo/',
  'headers': {
    'X-RapidAPI-Key': '9a03bdf091msh9d518ade9ae660fp18c011jsn33df2c7dcd93',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
} )
