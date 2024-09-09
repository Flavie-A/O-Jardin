import { createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import axiosInstance from '../../axios/axios';

export const fetchAddProductToFav = createAsyncThunk(
  'fetch/ADD_FAV',
  async (id: number, thunkAPI) => {
    const response = await axiosInstance.post('/me/garden', {
      product_id: id,
    });

    return response.data;
  }
);

export const fetchDeleteFav = createAsyncThunk(
  'fetch/DELETE_FAV',
  async (id: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const userId = state.myGarden.userData.id;

    const response = await axiosInstance.delete(`/me/garden/${userId}`, {
      data: {
        product_id: id,
      },
    });

    return response.data;
  }
);
