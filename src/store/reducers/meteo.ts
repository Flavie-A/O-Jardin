import { createReducer } from '@reduxjs/toolkit';
import fetchMeteo from '../thunks/meteoThunk';

export interface MeteoState {
  name: string;
  weatherForecast: any[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: MeteoState = {
  name: '',
  weatherForecast: [],
  loading: false,
  error: null,
};

const meteoReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchMeteo.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchMeteo.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.weatherForecast = action.payload.weatherForecast;
      state.loading = false;
    })
    .addCase(fetchMeteo.rejected, (state) => {
      state.loading = false;
      state.error = 'La data de la méteo ne charge pas';
    });
});

export default meteoReducer;
