import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axios';

const fetchAllTutorials = createAsyncThunk(
  'tutos/fetchAllTutorials',
  async () => {
    const response = await axiosInstance.get('/tutorials/');
    return response.data;
  }
);
export default fetchAllTutorials;
