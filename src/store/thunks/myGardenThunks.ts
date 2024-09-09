import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axios';

export const fetchUserData = createAsyncThunk(
  'user/GET_DATA',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/me/garden');

      const userData = response.data[0].result.user;
      const allFavProducts = response.data[0].result.products;
      userData.forecastAlert = response.data[0].result.user.forecast_alert;
      userData.wateringAlert = response.data[0].result.user.watering_alert;

      const { forecast_alert, watering_alert, ...userDataWithout_ } = userData

      return { userDataWithout_, allFavProducts };
    } catch (error) {
      return thunkAPI.rejectWithValue('Erreur de connexion');
    }
  }
);

export const updateAlert = createAsyncThunk(
  'user/UPDATE_ALERT',
  async (
    userData: { forecastAlert: boolean; wateringAlert: boolean },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.patch('/me/alerts', {
        forecast_alert: userData.forecastAlert,
        watering_alert: userData.wateringAlert,
      });
      userData.forecastAlert = response.data.forecast_alert;
      userData.wateringAlert = response.data.watering_alert;
      return { userData };
    } catch (error) {
      return thunkAPI.rejectWithValue('Erreur de mise à jour des alertes');
    }
  }
);
