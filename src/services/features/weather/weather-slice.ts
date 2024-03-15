import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherModel } from '../../../api/geo/model';

const initialState: WeatherModel = {} as WeatherModel
const weather = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeatherData: (state, action: PayloadAction<WeatherModel>) => {
      return action.payload;
    },
  },
});

export const { setWeatherData } = weather.actions;
export const weatherSlice = weather.reducer;
