import { createReducer } from '@reduxjs/toolkit';
import { Tutorial } from '../../@types/types';
import fetchAllTutorials from '../thunks/tutorielsThunk';

interface TutorialState {
  tutorials: Tutorial[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: TutorialState = {
  tutorials: [],
  loading: false,
  error: null,
};

const tutoReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAllTutorials.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchAllTutorials.fulfilled, (state, action) => {
      state.tutorials = action.payload;
      state.loading = false;
      state.error = null;
    })
    .addCase(fetchAllTutorials.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
});
export default tutoReducer;
