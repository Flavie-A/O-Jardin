import { createAction, createReducer } from '@reduxjs/toolkit';
import { Product, User } from '../../@types/types';
import { fetchUserData, updateAlert } from '../thunks/myGardenThunks';

interface MyGardenState {
  loading: boolean;
  error: string | null | undefined;
  favProducts: Product[];
  userData: User;
}

const initialState: MyGardenState = {
  favProducts: [],
  userData: {} as User,
  loading: false,
  error: null,
};

export const actionAddProductToFav = createAction<number>('fav/ADD_FAV');
export const actionFetchDeleteFav = createAction<number>('fav/DELETE_FAV');


const myGardenReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUserData.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUserData.fulfilled, (state, action) => {
      state.favProducts = action.payload.allFavProducts;
      state.userData = action.payload.userDataWithout_;
      state.loading = false;
      state.error = null;
    })
    .addCase(fetchUserData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(updateAlert.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateAlert.fulfilled, (state, action) => {
      state.userData.forecastAlert = action.payload.userData.forecastAlert;
      state.userData.wateringAlert = action.payload.userData.wateringAlert;
      state.loading = false;
      state.error = null;
    });

});

export default myGardenReducer;
