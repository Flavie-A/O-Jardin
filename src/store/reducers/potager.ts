import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PotagerState {
  horizontal: number;
  vertical: number;
}

const initialState: PotagerState = {
  horizontal: 5,
  vertical: 5,
};

export const potagerSlice = createSlice({
  name: 'potager',
  initialState,
  reducers: {
    setHorizontal: (state, action: PayloadAction<number>) => {
      state.horizontal = action.payload;
    },
    setVertical: (state, action: PayloadAction<number>) => {
      state.vertical = action.payload;
    },
  },
});

export const { setHorizontal, setVertical } = potagerSlice.actions;
export default potagerSlice.reducer;
