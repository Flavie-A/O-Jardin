import { createAsyncThunk } from '@reduxjs/toolkit';
import { addTokenToCookies } from '../../cookies/cookies';

import type { RootState } from '../store';
import axiosInstance, { addTokenToAxiosInstance } from '../../axios/axios';
import { addTokenToLocalStorage } from '../../localStorage/localstorage';

const actionCheckLogin = createAsyncThunk(
  'user/CHECK_LOGIN',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const response = await axiosInstance.post('/login', {
      email: state.user.credentials.email,
      password: state.user.credentials.password,
    });
    const { token } = response.data;
    addTokenToAxiosInstance(token);
    addTokenToCookies(token);
    return { token };
  }
);
const actionNewUser = createAsyncThunk(
  'user/NEW_USER',
  async (newUser: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    address?: string;
    zip_code?: string;
    city?: string;
  }) => {
    const response = await axiosInstance.post('/registration', newUser);
    return response.data;
  }
);

const actionVerifyEmailExist = createAsyncThunk(
  'user/VERIFY_EMAIL_EXIST',
  async (email: string) => {
    const response = await axiosInstance.post('/registration/email', { email });

    return response.data.exists as boolean;
  }
);

const actionUpdateUser = createAsyncThunk(
  'user/UPDATE_USER',
  async (userToUpdate: {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    address?: string;
    zip_code?: string;
    city?: string;
  }) => {
    const response = await axiosInstance.patch('/me/profile', userToUpdate);
    return response.data;
  }
);

const userActions = { actionCheckLogin, actionNewUser, actionVerifyEmailExist, actionUpdateUser };

export default userActions;
